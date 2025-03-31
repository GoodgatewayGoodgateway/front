// RoommateCard.jsx
import React from 'react';
import './css/RoommateCard.css';

function RoommateCard({ name, age, avatar, mbti, job, location, budget, sleep, lifestyle }) {
    return (
        <div className="roommate-card card">
            <div className="roommate-avatar-wrapper">
                <span className="roommate-avatar" role="img" aria-label="Avatar">
                    {avatar}
                </span>
            </div>
            <h3 className="roommate-name">{name}, {age}세</h3>
            <p className="roommate-info">{mbti} • {job}</p>
            <p className="roommate-info">{location} • {budget}</p>
            <p className="roommate-info">{sleep} • {lifestyle}</p>
            <button className="roommate-chat-btn btn-primary">자세히 보기</button>
        </div>
    );
}

export default RoommateCard;