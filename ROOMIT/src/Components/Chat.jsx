import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './css/Chat.css';

const Chat = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // 샘플 사용자 정보
    const users = {
        '1': { name: '김지영', avatar: '👩' },
        '2': { name: '이민준', avatar: '👨' },
        '3': { name: '박소희', avatar: '👩' },
        // 필요한 만큼 추가
    };

    const otherUserInfo = users[roomId] || { name: `채팅방 ${roomId}`, avatar: '👤' };

    useEffect(() => {
        // 로컬 스토리지에서 메시지 불러오기
        const saved = localStorage.getItem(`chat_${roomId}`);
        const parsedMessages = saved ? JSON.parse(saved) : [];
        setMessages(parsedMessages);

        // 처음 채팅방에 들어갈 때 초기 메시지 표시
        if (parsedMessages.length === 0) {
            const initialMessage = {
                senderId: 'other',
                content: '안녕하세요! 룸메이트에 관해 궁금한 점이 있으신가요?',
                timestamp: new Date().toISOString(),
            };
            setMessages([initialMessage]);
            localStorage.setItem(`chat_${roomId}`, JSON.stringify([initialMessage]));
        }
    }, [roomId]);

    // 메시지가 추가될 때마다 스크롤 맨 아래로 이동
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = () => {
        if (input.trim() === '') return;

        const newMessage = {
            senderId: 'me',
            content: input,
            timestamp: new Date().toISOString(),
        };

        const updated = [...messages, newMessage];
        setMessages(updated);
        localStorage.setItem(`chat_${roomId}`, JSON.stringify(updated));
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="chat-room">
            <div className="chat-header">
                <button onClick={handleBack} className="back-button">
                    ←
                </button>
                <h3>{otherUserInfo.avatar} {otherUserInfo.name}</h3>
                <div className="chat-actions">
                    <button aria-label="정보">ℹ️</button>
                </div>
            </div>

            <div className="chat-messages">
                {messages.length === 0 ? (
                    <div className="empty-chat">
                        <span>💬</span>
                        <p>대화를 시작해보세요!</p>
                    </div>
                ) : (
                    messages.map((msg, i) => (
                        <div key={i} className={`chat-message ${msg.senderId === 'me' ? 'right' : 'left'}`}>
                            <div className="bubble">{msg.content}</div>
                            <small>{formatTime(msg.timestamp)}</small>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
                <div className="chat-input">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="메시지를 입력하세요"
                    />
                    <button onClick={sendMessage} aria-label="전송">
                        ➤
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;