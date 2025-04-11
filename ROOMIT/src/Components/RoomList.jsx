import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ChevronRight, Users, Star } from 'lucide-react';
import './css/RoomList.css'; // 외부 CSS 파일 import
// RoomList 컴포넌트 
const RoomList = () => {
    // 샘플 데이터
    const chatRooms = [
        { id: 1, name: "김지영", unread: 3, online: true, lastMessage: "안녕하세요! 룸메이트에 관해 궁금한 점이 있으신가요?", avatar: "/vite.svg", type: "friend", readtime: "2025-04-10T11:00:00Z" }, // 1시간 전
        { id: 2, name: "이민준", unread: 0, online: true, lastMessage: "내일 미팅 준비는 다 됐나요?", avatar: "/vite.svg", type: "work", readtime: "2025-04-10T07:00:00Z" }, // 5시간 전
        { id: 3, name: "박소희", unread: 5, online: false, lastMessage: "주말에 같이 영화 볼래요?", avatar: "/vite.svg", type: "friend", readtime: "2025-04-10T00:30:00Z" }, // 오늘
        { id: 4, name: "프로젝트 팀", unread: 0, online: true, lastMessage: "다음 주 일정 확인해주세요", avatar: "/vite.svg", type: "work", readtime: "2025-04-09T23:50:00Z" }, // 어제
        { id: 5, name: "홍길동", unread: 7, online: false, lastMessage: "자료 검토 부탁드립니다", avatar: "/vite.svg", type: "work", readtime: "2025-04-08T15:20:00Z" }, // 어제
        { id: 6, name: "이수진", unread: 0, online: true, lastMessage: "오늘 저녁에 시간 되세요?", avatar: "/vite.svg", type: "friend", readtime: "2025-04-05T10:00:00Z" }, // 오래전
        { id: 7, name: "정우성", unread: 1, online: false, lastMessage: "회의 자료 준비 완료했습니다.", avatar: "/vite.svg", type: "friend", readtime: "2025-03-25T14:00:00Z" }, // 오래전
        { id: 9, name: "김민지", unread: 0, online: false, lastMessage: "오늘 날씨 정말 좋네요!", avatar: "/vite.svg", type: "friend", readtime: "2025-04-10T03:00:00Z" }, // 오늘
        { id: 10, name: "이현우", unread: 2, online: true, lastMessage: "프로젝트 진행 상황 공유 부탁드립니다.", avatar: "/vite.svg", type: "work", readtime: "2024-12-01T12:00:00Z" }, // 오래전
    ];

    const formatReadTime = (readtime) => {
        const now = new Date();
        const readDate = new Date(readtime);

        // KST 기준으로 변환 (UTC → 한국 시간)
        const nowKST = new Date(now.getTime() + 9 * 60 * 60 * 1000);
        const readDateKST = new Date(readDate.getTime() + 9 * 60 * 60 * 1000);

        // 시간 차이 계산
        const diffMs = nowKST - readDateKST;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        // 날짜 비교 (KST 기준)
        const nowDate = nowKST.toISOString().split("T")[0]; // yyyy-MM-dd 형식
        const readDateFormatted = readDateKST.toISOString().split("T")[0]; // yyyy-MM-dd 형식

        if (diffHours < 6) {
            return `${diffHours}시간 전`;
        } else if (nowDate === readDateFormatted) {
            return "오늘";
        } else if (diffDays === 1) {
            return "어제";
        } else {
            return "오래전";
        }
    };



    return (
        <div className="room-list">
            {chatRooms.map((room) => (
                <div key={room.id} className="room-item">
                    <div className="room-avatar">
                        {/* 룸 아이콘 및 아바타 표시 */}
                        <img src={room.avatar} alt={`${room.name} avatar`} className="room-avatar-image" />
                        {room.online && (
                            <div className="online-indicator"></div>
                        )}
                    </div>

                    <div className="room-content">
                        <div className="room-header">
                            <div className="room-name-container">
                                {/* <span className="room-icon">{getRoomIcon(room.type)}</span> */}
                                <h3 className="room-name">{room.name}</h3>
                            </div>
                            <span className="room-time">{formatReadTime(room.readtime)}</span>
                        </div>
                        <p className="room-last-message">{room.lastMessage}</p>
                    </div>

                    {room.unread > 0 && (
                        <div className="unread-badge">
                            {/* 읽지 않은 메시지 수 표시 */}
                            {room.unread}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RoomList;
