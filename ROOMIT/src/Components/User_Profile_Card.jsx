import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Components/css/User_Profile_Card.css';

const ProfileCard = (userdata) => {
    const { id, name = '이름 없음', age = 'N/A', job = '직업 미정', idealRoommate = '설명 없음' } = userdata;
    const navigate = useNavigate();

    const handleDetailClick = () => {
        if (id) {
            navigate(`/meeting/${id}`);
        }
    };

    return (
        <div className="profile-card" style={{ cursor: 'pointer' }}>
            <div className="profile-image-container">
                <div className="profile-image"></div>
            </div>
            <div className="profile-info">
                <div className="Cardprofile-header">
                    <span className="profile-name">{name}</span>
                    <span className="profile-age">{age}세</span>
                </div>
                <div className="Cardprofile-job">{job}</div>
                <div className="profile-description">{idealRoommate}</div>
                <button className="profile-detail-button" onClick={handleDetailClick}>
                    프로필 상세보기
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;
