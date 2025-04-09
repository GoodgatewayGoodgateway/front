import React from 'react';
import {
    MapPin, Briefcase, Calendar, Star, Coffee, Home, Volume2, MessageCircle, Heart, Utensils, Moon, Sun
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Pages/css/MeetingDetail.css';
import Header from '../Components/Header';



const UserProfile = ({ userData, currentUser, setCurrentUser }) => {
    const { id } = useParams();
    const user = userData.find((u) => u.id === parseInt(id));

    const navigate = useNavigate();
    const currentUserId = 99;

    // user가 없을 경우 처리 (예외 대응)
    if (!user) {
        return <div>해당 유저를 찾을 수 없습니다.</div>;
    }
    // 🧑‍💻 유저 기본 데이터
    // 🧼 라이프스타일 카테고리
    const lifestyleCategories = [
        {
            title: "🍽️ 식생활 & 주방 관련",
            items: [
                { label: "식사 시간", value: "규칙적" },
                { label: "주방 사용", value: "자주 사용" },
                { label: "요리 빈도", value: "주 3-4회" }
            ],
            icon: <Utensils size={40} />
        },
        {
            title: "🧹 청결 및 정리 습관",
            items: [
                { label: "청결 수준", value: "상" },
                { label: "청소 주기", value: "주 2회" },
                { label: "공용공간 관리", value: "적극적" }
            ],
            icon: <Home size={40} />
        },
        {
            title: "🔊 소음 민감도",
            items: [
                { label: "소음 민감도", value: "보통" },
                { label: "취침시 소음", value: "조용함 선호" },
                { label: "음악/TV 볼륨", value: "적당함" }
            ],
            icon: <Volume2 size={40} />
        }
    ];

    const handleChatClick = () => {
        const sortedIds = [currentUserId, user.id].sort((a, b) => a - b);
        const roomId = `${sortedIds[0]}-${sortedIds[1]}`;
        if (!roomId.startsWith(':')) {
            navigate(`/chat/${roomId}`);
        }
    };

    return (
        <>
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <div className="meeting-user-detail">

                <div className="profile-header">
                    <div className="profile-image-large"></div>
                    <div className="profile-basic-info">
                        <h1>{user.name}, {user.age}세</h1>
                        <div className="profile-job-location">
                            <div className="profile-job">
                                <Briefcase size={40} />
                                <span>{user.job}</span>
                            </div>
                            <div className="profile-location">
                                <MapPin size={40} />
                                <span>{user.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="meetprofile-section">
                    <h2>자기소개</h2>
                    <p>{user.introduction}</p>
                </section>

                <section className="meetprofile-section">
                    <h2>관심사</h2>
                    <div className="interests-list">
                        {(user.interests || []).map((interest, index) => (
                            <span key={index} className="interest-tag">{interest}</span>
                        ))}
                    </div>
                </section>

                <section className="meetprofile-section">
                    <h2>이상적인 룸메이트</h2>
                    <p>{user.idealRoommate}</p>
                </section>

                <section className="meetprofile-section lifestyle-details">
                    <h2>기본 정보</h2>
                    <div className="lifestyle-grid">
                        <div className="lifestyle-item">
                            <Star size={40} />
                            <span>MBTI</span>
                            <strong>{user.mbti}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Sun size={40} />
                            <span>기상 시간</span>
                            <strong>{user.lifestyle?.wakeUpTime}</strong>

                        </div>
                        <div className="lifestyle-item">
                            <Moon size={40} />
                            <span>취침 시간</span>
                            <strong>{user.lifestyle?.sleepTime}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Calendar size={40} />
                            <span>밤낮 성향</span>
                            <strong>{user.lifestyle?.dayNightType}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Coffee size={40} />
                            <span>흡연 여부</span>
                            <strong>{user.smoking}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Coffee size={40} />
                            <span>음주</span>
                            <strong>{user.drinking}</strong>
                        </div>
                    </div>
                </section>

                {lifestyleCategories.map((category, index) => (
                    <section key={index} className="meetprofile-section lifestyle-category">
                        <h2>{category.title}</h2>
                        <div className="lifestyle-detail-grid">
                            {category.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="lifestyle-detail-item">
                                    {category.icon}
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                <div className="action-buttons">
                    <button className="like-button">
                        <Heart size={40} />
                        좋아요
                    </button>
                    <button className="chat-button" onClick={handleChatClick}>
                        <MessageCircle size={40} />
                        채팅하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
