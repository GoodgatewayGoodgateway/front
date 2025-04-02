import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Briefcase, Calendar, Star } from 'lucide-react';
import './css/MeetingDetail.css';
import Header from '../components/Header';

const MeetingDetail = ({ userData = [] }) => {
    const { id } = useParams(); // URL에서 id 파라미터 가져오기




    console.log("URL ID:", id);
    console.log("Parsed ID:", parseInt(id, 10));
    console.log("User Data:", userData);
    console.log(
        "Matched User:",
        userData.find((user) => user.id === parseInt(id, 10))
    );

    const user = userData.find(user => user.id === parseInt(id, 10));

    if (!user) {
        return <div>사용자를 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <Header />
            <div className="meeting-user-detail">
                <div className="profile-header">
                    <div className="profile-image-large"></div>
                    <div className="profile-basic-info">
                        <h1>{user.name}, {user.age}</h1>
                        <div className="profile-job-location">
                            <div className="profile-job">
                                <Briefcase size={16} />
                                <span>{user.job}</span>
                            </div>
                            <div className="profile-location">
                                <MapPin size={16} />
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
                        {user.interests.length > 0 ? (
                            user.interests.map((interest, index) => (
                                <span key={index} className="interest-tag">{interest}</span>
                            ))
                        ) : (
                            <p>관심사가 없습니다.</p>
                        )}
                    </div>
                </section>

                <section className="profile-section">
                    <h2>이상적인 룸메이트</h2>
                    <p>{user.idealRoommate}</p>
                </section>

                <section className="profile-section lifestyle-details">
                    <h2>라이프스타일</h2>
                    <div className="lifestyle-grid">
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>MBTI</span>
                            <strong>{user.mbti}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Calendar size={16} />
                            <span>기상 시간</span>
                            <strong>{user.lifestyle?.wakeUpTime || '미정'}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Calendar size={16} />
                            <span>취침 시간</span>
                            <strong>{user.lifestyle?.sleepTime || '미정'}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>흡연 여부</span>
                            <strong>{user.smoking}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>음주</span>
                            <strong>{user.drinking}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>청결 수준</span>
                            <strong>{user.lifestyle?.cleanLevel || '미정'}</strong>
                        </div>
                    </div>
                </section>

                <div className="action-buttons">
                    <button className="like-button">좋아요</button>
                    <button className="chat-button">채팅하기</button>
                </div>
            </div>
        </>
    );
};

export default MeetingDetail;
