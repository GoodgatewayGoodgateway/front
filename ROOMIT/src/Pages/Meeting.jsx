import React, { useState, useEffect } from 'react';
import { fetchProfile } from '../services/user';
import ProfileCard from '../Components/User_Profile_Card';
import Header from '../Components/Header';
import FilterPanel from '../Components/Filter'; // ✅ FilterPanel 컴포넌트 import
import { Funnel } from 'lucide-react';
import '../Pages/css/Meeting.css';

// 필터 데이터 정의
const filters = [
    { category: '나이대', options: ['상관없음', '20-25', '26-30', '31-35'] },
    { category: '흡연', options: ['상관없음', '비흡연', '흡연'] },
    { category: '활동시간', options: ['상관없음', '아침형', '저녁형'] },
    { category: '음주', options: ['상관없음', '음주', '가끔', '비음주'] },
    { category: '청결 수준', options: ['상관없음', '낮음', '보통', '높음', '매우 높음'] },
    { category: '소음 민감도', options: ['상관없음', '둔감', '보통', '민감', '매우 민감'] },
    { category: '반려동물 허용', options: ['상관없음', '허용 안함', '일부 허용', '대부분 허용', '모두 허용'] },
    { category: '식사 시간', options: ['상관없음', '불규칙적', '아침형', '저녁형', '밤형'] },
];

const Meeting = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log("📌 [Meeting.jsx] userId:", userId);

        const loadProfiles = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchProfile(userId);
                console.log("✅ 서버에서 받은 프로필 데이터:", data);
                // fetchProfile이 단일 객체 또는 배열을 반환할 수 있음
                const userArray = Array.isArray(data) ? data : [data];
                setUsers(userArray);
                setFilteredUsers(userArray);
            } catch (error) {
                console.error('❌ 데이터를 가져오는 데 실패했습니다:', error);
                setError('프로필 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            loadProfiles();
        }
    }, []);

    const togglePanel = () => {
        setOpen(prev => !prev);
        console.log("📂 패널 토글 상태:", !open);
    };

    if (isLoading) {
        return <div className="loading">데이터를 불러오는 중...</div>;
    }

    if (error) {
        return (
            <div className="error">
                {error}
                <button onClick={() => window.location.reload()} style={{ marginLeft: '10px' }}>
                    다시 시도
                </button>
            </div>
        );
    }

    return (
        <div className="roommates-list">
            <Header />
            <div className="meeting-header">
                <h1>룸메이트 매칭</h1>
                <h2>룸메이트를 찾아보세요!</h2>
                <button className="filterbtn" onClick={togglePanel}>
                    <Funnel size={17} />
                    필터
                </button>
            </div>

            <FilterPanel
                open={open}
                setOpen={setOpen}
                filters={filters}
                users={users}
                onFilterChange={setFilteredUsers}
                showFilterButton={false} // ✅ 내부 필터 버튼 비활성화
            />

            <div className="roommate-list">
                {filteredUsers
                    .filter(user => user && user.id)
                    .map(user => (
                        <ProfileCard key={user.id} userData={user} />
                    ))}
            </div>
        </div>
    );
};

export default Meeting;