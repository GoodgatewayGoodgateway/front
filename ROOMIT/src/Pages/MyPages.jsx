
import React, { useState } from 'react';
import {
    MapPin, Briefcase, Calendar, Star, Coffee, Home, Volume2, MessageCircle, Heart, Utensils, Moon, Sun
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../Pages/css/MyPages.css';
import Header from '../Components/Header';

const MyEditPage = ({ currentUser, setCurrentUser, updateUserData }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ ...currentUser });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLifestyleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            lifestyle: {
                ...prev.lifestyle,
                [name]: value
            }
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // 저장 작업 시뮬레이션
        setTimeout(() => {
            updateUserData(formData);
            setIsSaving(false);
            navigate(`/mypage/${formData.id}`);
        }, 500);
    };

    const handleToggleMatching = () => {
        // 디버깅을 위한 로그 추가
        console.log('토글 전 상태:', formData.matching);

        const updatedFormData = {
            ...formData,
            matching: !formData.matching
        };

        // 즉시 상태 업데이트
        setFormData(updatedFormData);

        // updateUserData 호출 (이 함수가 제대로 구현되었는지 확인)
        updateUserData(updatedFormData);

        // 토글 후 상태 확인
        console.log('토글 후 상태:', updatedFormData.matching);

        // 시각적 피드백 제공
        alert(updatedFormData.matching ? '미팅 페이지에 공개되었습니다!' : '미팅 페이지에서 비공개되었습니다!');
    };

    return (
        <>
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />

            <div className="meeting-user-detail">

                <div className="profile-header">
                    <div className="profile-image-large"></div>
                    <div className="profile-basic-info">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="이름"
                            className="input-field"
                        />
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="나이"
                            className="input-field"
                        />
                        <div className="profile-job-location">
                            <div className="profile-job">
                                <Briefcase size={40} />
                                <input
                                    type="text"
                                    name="job"
                                    value={formData.job}
                                    onChange={handleChange}
                                    placeholder="직업"
                                    className="input-field"
                                />
                            </div>
                            <div className="profile-location">
                                <MapPin size={40} />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="지역"
                                    className="input-field"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <section className="meetprofile-section">
                    <h2>자기소개</h2>
                    <textarea
                        name="introduction"
                        value={formData.introduction}
                        onChange={handleChange}
                        className="textarea-field"
                        rows={4}
                        placeholder="자기소개를 입력하세요"
                    />
                </section>

                <section className="meetprofile-section">
                    <h2>관심사</h2>
                    <input
                        type="text"
                        name="interests"
                        value={formData.interests?.join(', ') || ''}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                interests: e.target.value.split(',').map(item => item.trim())
                            })
                        }
                        className="input-field"
                        placeholder="관심사를 쉼표(,)로 구분해 입력하세요"
                    />
                </section>

                <section className="meetprofile-section">
                    <h2>이상적인 룸메이트</h2>
                    <textarea
                        name="idealRoommate"
                        value={formData.idealRoommate}
                        onChange={handleChange}
                        className="textarea-field"
                        rows={3}
                        placeholder="이상적인 룸메이트를 입력하세요"
                    />
                </section>

                <section className="meetprofile-section lifestyle-details">
                    <h2>기본 정보</h2>
                    <div className="lifestyle-grid">
                        <div className="lifestyle-item">
                            <Star size={40} />
                            <span>MBTI</span>
                            <select
                                name="mbti"
                                value={formData.mbti}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="">선택해주세요</option>
                                <option value="ISTJ">ISTJ</option>
                                <option value="ISFJ">ISFJ</option>
                                <option value="INFJ">INFJ</option>
                                <option value="INTJ">INTJ</option>
                                <option value="ISTP">ISTP</option>
                                <option value="ISFP">ISFP</option>
                                <option value="INFP">INFP</option>
                                <option value="INTP">INTP</option>
                                <option value="ESTP">ESTP</option>
                                <option value="ESFP">ESFP</option>
                                <option value="ENFP">ENFP</option>
                                <option value="ENTP">ENTP</option>
                                <option value="ESTJ">ESTJ</option>
                                <option value="ESFJ">ESFJ</option>
                                <option value="ENFJ">ENFJ</option>
                                <option value="ENTJ">ENTJ</option>
                            </select>
                        </div>

                        <div className="lifestyle-item">
                            <Sun size={40} />
                            <span>기상 시간</span>
                            <input
                                type="time"
                                name="wakeUpTime"
                                value={formData.lifestyle?.wakeUpTime || ''}
                                onChange={handleLifestyleChange}
                                className="input-field"
                            />
                        </div>
                        <div className="lifestyle-item">
                            <Moon size={40} />
                            <span>취침 시간</span>
                            <input
                                type="time"
                                name="sleepTime"
                                value={formData.lifestyle?.sleepTime || ''}
                                onChange={handleLifestyleChange}
                                className="input-field"
                            />
                        </div>
                        <div className="lifestyle-item">
                            <Calendar size={40} />
                            <span>밤낮 성향</span>
                            <select
                                name="dayNightPreference"
                                value={formData.lifestyle?.dayNightPreference || ''}
                                onChange={handleLifestyleChange}
                                className="input-field"
                            >
                                <option value="낮">낮</option>
                                <option value="밤">밤</option>
                            </select>
                        </div>
                        <div className="lifestyle-item">
                            <Coffee size={40} />
                            <span>흡연 여부</span>
                            <select
                                name="smoking"
                                value={formData.smoking}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="안 함">안 함</option>
                                <option value="가끔">가끔</option>
                                <option value="자주">자주</option>
                            </select>
                        </div>
                        <div className="lifestyle-item">
                            <Coffee size={40} />
                            <span>음주</span>
                            <select
                                name="drinking"
                                value={formData.drinking}
                                onChange={handleChange}
                                className="input-field"
                            >
                                <option value="안 함">안 함</option>
                                <option value="가끔">가끔</option>
                                <option value="자주">자주</option>
                            </select>
                        </div>
                    </div>
                </section>
                <div className="action-buttons">
                    <button
                        className={`primary-button ${isSaving ? 'saving' : ''}`}
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? '저장 중...' : '프로필 저장'}
                    </button>

                    {/* 토글 스위치로 변경한 미팅 페이지 등록 버튼 */}
                    <div className="toggle-container">
                        <span className="toggle-label">미팅 페이지 공개</span>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={Boolean(formData.matching)}
                                onChange={handleToggleMatching}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyEditPage;