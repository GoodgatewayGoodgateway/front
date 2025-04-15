import React from 'react';
import './css/RoommateSection.css';
import RoommateCard from './RoommateCard';

function RoommateSection({ users }) {
    console.log(users);  // users가 제대로 전달되고 있는지 확인
    const safeUsers = Array.isArray(users) && users.length > 0 ? users : [];

    return (
        <section className="roommate-section container">
            <h2 className="section-title">추천 룸메이트</h2>
            <div className="roommate-content">
                <div className="roommate-grid">
                    {safeUsers.slice(0, 5).map((user, index) => (
                        <RoommateCard
                            key={user.id || index}  // 👈 여기에 key 추가!
                            id={user.id || index}
                            name={user.name}
                            age={user.age}
                            sex={user.sex}
                            avatar={user.avatar}
                            mbti={user.mbti}
                            job={user.job}
                            location={user.location}
                            budget={user.budget}
                            sleep={user.sleep}
                            lifestyle={user.lifestyle}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default RoommateSection;
