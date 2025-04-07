import React, { useState } from 'react';
import ProfileCard from '../components/User_Profile_Card';
import Header from '../components/Header';
import FilterBar from '../components/filter';
import '../pages/css/Meeting.css';

const Meeting = ({ users, currentUser, setCurrentUser }) => {
    const [filteredUsers, setFilteredUsers] = useState(users);  // 초기 값은 전체 사용자 목록

    return (
        <div className="roommates-list">
            <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
            <h1>룸메이트 매칭</h1>
            <h2>룸메이트를 찾아보세요!</h2>
            <FilterBar users={users} onFilterChange={setFilteredUsers} />  {/* 필터링된 결과를 받아옴 */}
            <div className='roommate-list'>
                {filteredUsers.map(roommate => (
                    <ProfileCard key={roommate.id} {...roommate} />
                ))}
            </div>
        </div>
    );
};

export default Meeting;
