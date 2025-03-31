import React from 'react';
import { MapPin, Briefcase, Calendar, Star } from 'lucide-react';
import './css/MeetingDetail.css';
import Header from '../components/Header';
const MeetingDetail = ({ users }) => {
    if (!users) {
        return <div>사용자를 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <Header />
            <div className="meeting-user-detail">
                <div className="profile-header">
                    <div className="profile-image-large"></div>
                    <div className="profile-basic-info">
                        <h1>{users.name}, {users.age}</h1>
                        <div className="profile-job-location">
                            <div className="profile-job">
                                <Briefcase size={16} />
                                <span>{users.job}</span>
                            </div>
                            <div className="profile-location">
                                <MapPin size={16} />
                                <span>{users.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="profile-section">
                    <h2>자기소개</h2>
                    <p>{users.introduction}</p>
                </section>

                <section className="profile-section">
                    <h2>관심사</h2>
                    <div className="interests-list">
                        {users.interests?.length > 0 ? (
                            users.interests.map((interest, index) => (
                                <span key={index} className="interest-tag">{interest}</span>
                            ))
                        ) : (
                            <p>관심사가 없습니다.</p>
                        )}
                    </div>
                </section>

                <section className="profile-section">
                    <h2>이상적인 룸메이트</h2>
                    <p>{users.idealRoommate}</p>
                </section>

                <section className="profile-section lifestyle-details">
                    <h2>라이프스타일</h2>
                    <div className="lifestyle-grid">
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>MBTI</span>
                            <strong>{users.mbti}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Calendar size={16} />
                            <span>기상 시간</span>
                            <strong>{users.lifestyle?.wakeUpTime}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Calendar size={16} />
                            <span>취침 시간</span>
                            <strong>{users.lifestyle?.sleepTime}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>흡연 여부</span>
                            <strong>{users.smoking}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>음주</span>
                            <strong>{users.drinking}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>청결 수준</span>
                            <strong>{users.lifestyle?.cleanLevel}</strong>
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
