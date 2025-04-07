import { useEffect, useState } from 'react';
import './ChatRoom.css';

const getChatRoomId = (userId1, userId2) => {
    const sorted = [userId1, userId2].sort((a, b) => a - b);
    return `chat_${sorted[0]}_${sorted[1]}`;
};

const ChatRoom = ({ currentUserId, otherUserId }) => {
    const roomId = getChatRoomId(currentUserId, otherUserId);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem(roomId);
        if (saved) {
            setMessages(JSON.parse(saved));
        }
    }, [roomId]);

    const sendMessage = () => {
        if (input.trim() === '') return;

        const newMessage = {
            senderId: currentUserId,
            receiverId: otherUserId,
            content: input,
            timestamp: new Date().toISOString(),
        };

        const updated = [...messages, newMessage];
        setMessages(updated);
        localStorage.setItem(roomId, JSON.stringify(updated));
        setInput('');
    };

    return (
        <div className="chat-room">
            <h3>💬 Chat with User {otherUserId}</h3>
            <div className="chat-messages">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`chat-message ${msg.senderId === currentUserId ? 'right' : 'left'}`}
                    >
                        <div className="bubble">{msg.content}</div>
                        <br />
                        <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="메시지 입력"
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
};

export default ChatRoom;
