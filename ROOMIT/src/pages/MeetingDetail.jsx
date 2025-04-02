import React from 'react';
import { MapPin, Briefcase, Calendar, Star } from 'lucide-react';
import './css/MeetingDetail.css';
import Header from '../components/Header';

const MeetingDetail = ({
    id,
    name = '이름 없음',
    age = 'N/A',
    job = '직업 미정',
    location = '위치 미정',
    introduction = '설명 없음',
    interests = [],
    idealRoommate = '설명 없음',
    mbti = '미정',
    lifestyle = {},
    smoking = '정보 없음',
    drinking = '정보 없음'
}) => {

    if (!id) {
        return <div>사용자를 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <Header />
            <div className="meeting-user-detail">
                <div className="profile-header">
                    <div className="profile-image-large"></div>
                    <div className="profile-basic-info">
                        <h1>{name}, {age}</h1>
                        <div className="profile-job-location">
                            <div className="profile-job">
                                <Briefcase size={16} />
                                <span>{job}</span>
                            </div>
                            <div className="profile-location">
                                <MapPin size={16} />
                                <span>{location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="profile-section">
                    <h2>자기소개</h2>
                    <p>{introduction}</p>
                </section>

                <section className="profile-section">
                    <h2>관심사</h2>
                    <div className="interests-list">
                        {interests.length > 0 ? (
                            interests.map((interest, index) => (
                                <span key={index} className="interest-tag">{interest}</span>
                            ))
                        ) : (
                            <p>관심사가 없습니다.</p>
                        )}
                    </div>
                </section>

                <section className="profile-section">
                    <h2>이상적인 룸메이트</h2>
                    <p>{idealRoommate}</p>
                </section>

                <section className="profile-section lifestyle-details">
                    <h2>라이프스타일</h2>
                    <div className="lifestyle-grid">
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>MBTI</span>
                            <strong>{mbti}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Calendar size={16} />
                            <span>기상 시간</span>
                            <strong>{lifestyle?.wakeUpTime || '미정'}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Calendar size={16} />
                            <span>취침 시간</span>
                            <strong>{lifestyle?.sleepTime || '미정'}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>흡연 여부</span>
                            <strong>{smoking}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>음주</span>
                            <strong>{drinking}</strong>
                        </div>
                        <div className="lifestyle-item">
                            <Star size={16} />
                            <span>청결 수준</span>
                            <strong>{lifestyle?.cleanLevel || '미정'}</strong>
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