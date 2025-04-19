import React, { useState, useEffect } from 'react';
import { fetchProfile } from '../services/user';
import ProfileCard from '../Components/User_Profile_Card';
import Header from '../Components/Header';
import Filter from "../Components/Filter"; // ✅ 패널 컴포넌트 import\

import { Funnel } from 'lucide-react';
import '../Pages/css/Meeting.css';

const Meeting = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        console.log("📌 [Meeting.jsx] userId:", userId);

        fetchProfile(userId)
            .then((data) => {
                console.log("✅ 서버에서 받은 프로필 데이터:", data);
                setUsers(data);
                setFilteredUsers(data);
            })
            .catch((error) => {
                console.error('❌ 데이터를 가져오는 데 실패했습니다:', error);
            });
    }, []);

    const togglePanel = () => {
        setOpen(!open);
        console.log("📂 패널 토글 상태:", !open);
    };

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


            {/* ✅ 필터 패널 삽입 */}
            <Filter
                open={open}
                setOpen={setOpen}
                users={users}
                onFilterChange={setFilteredUsers}
            />
            <div className='roommate-list'>
                {filteredUsers
                    .filter(user => user && user.id)
                    .map((user, index) => (
                        <ProfileCard key={`${user.id}-${index}`} userData={user} />
                    ))}
            </div>
        </div>
    );
};

export default Meeting;
