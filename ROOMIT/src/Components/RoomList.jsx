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
        { id: 8, name: "정우성", unread: 1, online: false, lastMessage: "회의 자료 준비 완료했습니다.", avatar: "👨", type: "work" },
        { id: 9, name: "친구 그룹", unread: 4, online: true, lastMessage: "다음 주 여행 계획 세웠나요?", avatar: "👫", type: "friend" },
        { id: 10, name: "김민지", unread: 0, online: false, lastMessage: "오늘 날씨 정말 좋네요!", avatar: "👩", type: "friend" },
        { id: 11, name: "이현우", unread: 2, online: true, lastMessage: "프로젝트 진행 상황 공유 부탁드립니다.", avatar: "👨", type: "work" },
        { id: 12, name: "스터디 그룹", unread: 3, online: false, lastMessage: "다음 주 스터디 주제는 무엇인가요?", avatar: "📚", type: "work" },
        { id: 13, name: "박지훈", unread: 0, online: true, lastMessage: "오늘 저녁에 운동 갈래요?", avatar: "👨", type: "friend" },
        { id: 14, name: "이유진", unread: 6, online: false, lastMessage: "회의 시간 변경됐습니다.", avatar: "👩", type: "work" },
        { id: 15, name: "가족 채팅방", unread: 1, online: true, lastMessage: "주말에 가족 모임 있어요.", avatar: "👪", type: "family" },
        { id: 16, name: "최민호", unread: 0, online: false, lastMessage: "다음 주에 시간 괜찮으세요?", avatar: "👨", type: "friend" },
        { id: 17, name: "프로젝트 A", unread: 5, online: true, lastMessage: "마감일이 다가오고 있습니다.", avatar: "📁", type: "work" },
        { id: 18, name: "김하늘", unread: 0, online: true, lastMessage: "오늘 점심 뭐 드실래요?", avatar: "👩", type: "friend" },
        { id: 19, name: "동아리 채팅방", unread: 2, online: false, lastMessage: "다음 모임 일정 확인해주세요.", avatar: "🎉", type: "friend" },
        { id: 20, name: "이정민", unread: 3, online: true, lastMessage: "새로운 프로젝트 제안서 확인 부탁드립니다.", avatar: "👨", type: "work" },
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
