import React, { useState } from 'react';
import ProfileCard from '../Components/User_Profile_Card';
import Header from '../Components/Header';
import FilterBar from '../Components/Filter';
import '../Pages/css/Meeting.css';

const Meeting = ({ users }) => {
    const [filteredUsers, setFilteredUsers] = useState(users);  // 초기 값은 전체 사용자 목록

    return (
        <div className="roommates-list">
            <Header />
            <h1>룸메이트 매칭</h1>
            <h2>룸메이트를 찾아보세요!</h2>
            <FilterBar users={users} onFilterChange={setFilteredUsers} />  {/* 필터링된 결과를 받아옴 */}
            <div className='roommate-list'>
                {filteredUsers
                    .filter(user => user && user.id) // 존재하고 id가 있는 유저만 통과
                    .map((user, index) => (
                        <ProfileCard key={`${user.id}-${index}`} userData={user} />
                    ))}

            </div>



        </div>
    );
};

export default Meeting;
