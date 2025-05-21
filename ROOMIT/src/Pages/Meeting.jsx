import React, { useState, useEffect, useCallback } from 'react';
import { fetchAllProfiles } from '../services/user';
import ProfileCard from '../Components/User_Profile_Card';
import Header from '../Components/Header';
import FilterPanel from '../Components/Filter';
import { Funnel } from 'lucide-react';
import '../Pages/css/Meeting.css';
import Loading from './Loading';
import RetryPage from './RetryPage';

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

    const loadProfiles = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchAllProfiles();
            console.log("✅ 서버에서 받은 전체 유저 프로필:", data);
            setUsers(data);
            setFilteredUsers(data);
        } catch (err) {
            console.error('❌ 데이터를 가져오는 데 실패했습니다:', err);
            setError('데이터를 불러오는 데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProfiles();
    }, [loadProfiles]);

    const togglePanel = () => {
        setOpen(prev => !prev);
        console.log("📂 패널 토글 상태:", !open);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <RetryPage errorMessage={error} onRetry={loadProfiles} />;
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
                showFilterButton={false}
            />

            <div className="roommate-list">
                {filteredUsers
                    .filter(user => user && user.profile)
                    .map(user => (
                        <ProfileCard key={user.userId} userData={user.profile} />
                    ))}
            </div>
        </div>
    );
};

export default Meeting;
