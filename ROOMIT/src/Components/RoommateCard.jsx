import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/RoommateCard.css';

function RoommateCard({ id, name, age, avatar, mbti, job, location, budget, lifestyle }) {
    const defaultAvatar = "👤";  // 기본 아바타
    // const defaultLifestyle = "정보 없음";  // 기본 라이프스타일
    const defaultLocation = "정보 없음";  // 기본 위치
    const defaultBudget = "정보 없음";  // 기본 예산
    const navigate = useNavigate();

    const handleDetailClick = () => {
        if (id) {
            navigate(`/meeting/${id}`);
        }
    };

    // lifestyle 객체에서 필요한 정보를 추출
    const wakeUpTime = lifestyle?.wakeUpTime || "정보 없음";
    return (
        <div className="roommate-card card">
            <div className="roommate-avatar-wrapper">
                <span className="roommate-avatar" role="img" aria-label="Avatar">
                    {avatar || defaultAvatar}
                </span>
            </div>
            <h3 className="roommate-name">{name}, {age}세</h3>
            <p className="roommate-info">{mbti || "정보 없음"} • {job}</p>
            <p className="roommate-info">{location || defaultLocation} • {budget || defaultBudget}</p>
            {/* lifestyle 정보 출력 */}
            <div className="roommate-lifestyle">
                <p>기상 시간: {wakeUpTime}</p>
            </div>
            <button onClick={handleDetailClick} className="roommate-chat-btn btn-primary">자세히 보기</button>
        </div>
    );
}


export default RoommateCard;
