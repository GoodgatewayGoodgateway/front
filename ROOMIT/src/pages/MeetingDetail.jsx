import React from 'react';
import {
    MapPin, Briefcase, Calendar, Star, Coffee, Home, Volume2, MessageCircle, Heart, Utensils, Moon, Sun
} from 'lucide-react';
import '../pages/css/MeetingDetail.css';
import Header from '../components/Header';

const UserProfile = () => {
    // 🧑‍💻 유저 기본 데이터
    const user = {
        id: 1,
        name: "김민서",
        age: 18,
        job: "프론트엔드 개발자",
        location: "서울시 송파구",
        introduction: "활발하고 적극적인 성격, 새로운 기술을 배우는 것을 좋아함.",
        interests: ["프로그래밍", "운동", "게임", "음악"],
        idealRoommate: "서로 배우고 성장할 수 있는 룸메이트를 찾고 있어요.",
        mbti: "ESTP",
        smoking: "비흡연",
        drinking: "사회적 음주",
        lifestyle: {
            wakeUpTime: "오전 8시",
            sleepTime: "오전 12시",
            cleanLevel: "상",
            dayNightType: "낮형", // ⛅ 추가된 필드
        }
    };

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

    return (
        <>
            <Header />

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

                <section className="profile-section">
                    <h2>자기소개</h2>
                    <p>{user.introduction}</p>
                </section>

                <section className="profile-section">
                    <h2>관심사</h2>
                    <div className="interests-list">
                        {user.interests.map((interest, index) => (
                            <span key={index} className="interest-tag">{interest}</span>
                        ))}
                    </div>
                </section>

                <section className="profile-section">
                    <h2>이상적인 룸메이트</h2>
                    <p>{user.idealRoommate}</p>
                </section>

                <section className="profile-section lifestyle-details">
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
                            <strong>{user.lifestyle.wakeUpTime}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Moon size={40} />
                            <span>취침 시간</span>
                            <strong>{user.lifestyle.sleepTime}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Calendar size={40} />
                            <span>밤낮 성향</span>
                            <strong>{user.lifestyle.dayNightType}</strong>
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
                    <section key={index} className="profile-section lifestyle-category">
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
                    <button className="chat-button">
                        <MessageCircle size={40} />
                        채팅하기
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
