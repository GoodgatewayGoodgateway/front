import React, { useState } from 'react';
import ProfileCard from '../components/User_Profile_Card';
import Header from '../components/Header';
import '../pages/css/Meeting.css';

const Meeting = ({ users }) => {
    const [filters, setFilters] = useState({
        ageRange: '',
        smoking: '',
        activityTime: '',
        drinking: ''
    });

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // 아침형/저녁형 판별용 헬퍼 함수
    const getActivityType = (wakeTime) => {
        if (!wakeTime) return '';

        let hour = parseInt(wakeTime.replace(/[^0-9]/g, ''), 10);
        if (wakeTime.includes('오전')) {
            if (hour === 12) hour = 0; // 오전 12시는 0시로 처리
        } else if (wakeTime.includes('오후')) {
            if (hour !== 12) hour += 12;
        }

        // 아침형: 4시 ~ 9시, 저녁형: 10시 ~ 새벽 3시
        if (hour >= 4 && hour <= 9) {
            return 'morning';
        } else {
            return 'night';
        }
    };

    const filteredUsers = users.filter(user => {
        const { age, smoking, drinking, lifestyle } = user;

        const isAgeMatch = (() => {
            if (!filters.ageRange) return true;
            const [min, max] = filters.ageRange.split('-').map(Number);
            return age >= min && age <= max;
        })();

        const isSmokingMatch = !filters.smoking || smoking === (filters.smoking === 'non-smoker' ? '비흡연' : '흡연');


        const isDrinkingMatch = (() => {
            if (!filters.drinking) return true;
            if (filters.drinking === 'yes') return drinking.includes('음주');
            if (filters.drinking === 'social') return drinking === '가끔 음주';
            if (filters.drinking === 'no') return drinking === '금주';
            return false;
        })();

        const isActivityTimeMatch = (() => {
            if (!filters.activityTime) return true;
            const userType = getActivityType(lifestyle?.wakeUpTime);
            return userType === filters.activityTime;
        })();

        return isAgeMatch && isSmokingMatch && isDrinkingMatch && isActivityTimeMatch;
    });

    return (
        <div className="roommates-list">
            <Header />
            <h1>룸메이트 매칭</h1>
            <h2>룸메이트를 찾아보세요!</h2>
            <div className="roommate-search-bar">
                <form className="filter-form" onSubmit={handleSubmit}>
                    <label>
                        나이대:
                        <select name="ageRange" onChange={handleChange}>
                            <option value="">전체</option>
                            <option value="20-25">20-25</option>
                            <option value="26-30">26-30</option>
                            <option value="31-35">31-35</option>
                        </select>
                    </label>
                    <label>
                        흡연 여부:
                        <select name="smoking" onChange={handleChange}>
                            <option value="">전체</option>
                            <option value="non-smoker">비흡연</option>
                            <option value="smoker">흡연</option>
                        </select>
                    </label>
                    <label>
                        활동 시간:
                        <select name="activityTime" onChange={handleChange}>
                            <option value="">전체</option>
                            <option value="morning">아침형</option>
                            <option value="night">저녁형</option>
                        </select>
                    </label>
                    <label>
                        음주 여부:
                        <select name="drinking" onChange={handleChange}>
                            <option value="">전체</option>
                            <option value="yes">음주</option>
                            <option value="social">가끔</option>
                            <option value="no">비음주</option>
                        </select>
                    </label>

                </form>
            </div>
            <div className='roommate-list'>
                {
                    filteredUsers.map(roommate => (
                        <ProfileCard key={roommate.id} {...roommate} />
                    ))
                }
            </div>
        </div>
    );
};

export default Meeting;
