import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ChevronRight, Users, Star } from 'lucide-react';
import './css/RoomList.css'; // 외부 CSS 파일 import

// RoomList 컴포넌트 
const RoomList = () => {
    // 샘플 데이터
    const chatRooms = [
        { id: 1, name: "김지영", unread: 3, online: true, lastMessage: "안녕하세요! 룸메이트에 관해 궁금한 점이 있으신가요?", avatar: "👩", type: "friend" },
        { id: 2, name: "이민준", unread: 0, online: true, lastMessage: "내일 미팅 준비는 다 됐나요?", avatar: "👨", type: "work" },
        { id: 3, name: "박소희", unread: 5, online: false, lastMessage: "주말에 같이 영화 볼래요?", avatar: "👩", type: "friend" },
        { id: 4, name: "가족 그룹", unread: 2, online: true, lastMessage: "저녁 식사 계획이 있나요?", avatar: "👪", type: "family" },
        { id: 5, name: "프로젝트 팀", unread: 0, online: true, lastMessage: "다음 주 일정 확인해주세요", avatar: "👥", type: "work" },
        { id: 6, name: "홍길동", unread: 7, online: false, lastMessage: "자료 검토 부탁드립니다", avatar: "👨", type: "work" },
        { id: 7, name: "이수진", unread: 0, online: true, lastMessage: "오늘 저녁에 시간 되세요?", avatar: "👩", type: "friend" },
    ];

    // 룸 아이콘 결정 함수
    const getRoomIcon = (type) => {
        switch (type) {
            case "work":
                return <ChevronRight size={18} className="text-blue-500" />;
            case "family":
                return <Users size={18} className="text-green-500" />;
            case "important":
                return <Star size={18} className="text-yellow-500" />;
            default:
                return <MessageSquare size={18} className="text-gray-500" />;
        }
    };

    return (
        <div className="room-list">
            {chatRooms.map((room) => (
                <div key={room.id} className="room-item">
                    <div className="room-avatar">
                        <span className="room-avatar-text">{room.avatar}</span>
                        {room.online && (
                            <div className="online-indicator"></div>
                        )}
                    </div>

                    <div className="room-content">
                        <div className="room-header">
                            <div className="room-name-container">
                                <span className="room-icon">{getRoomIcon(room.type)}</span>
                                <h3 className="room-name">{room.name}</h3>
                            </div>
                            <span className="room-time">오늘</span>
                        </div>
                        <p className="room-last-message">{room.lastMessage}</p>
                    </div>

                    {room.unread > 0 && (
                        <div className="unread-badge">
                            {room.unread}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RoomList;
