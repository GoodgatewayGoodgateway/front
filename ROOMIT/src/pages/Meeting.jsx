import React from 'react';
import Header from '../components/Header';
import MeetingCard from '../components/User_Profile_Card';
import userData from '../data/userData';  // 유저 데이터 import

const Meeting = () => {
    return (
        <div>
            <Header />
            {userData.map(user => (
                <MeetingCard key={user.id} user={user} />
            ))}
        </div>
    );
};

export default Meeting;
