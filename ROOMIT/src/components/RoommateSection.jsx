// RoommateSection.jsx
import React from 'react';
import './css/RoommateSection.css';
import RoommateCard from './RoommateCard';

function RoommateSection() {
    const roommates = [
        {
            id: 1,
            name: '김지영',
            age: 26,
            avatar: '👩',
            mbti: 'ISFJ',
            job: '사무직',
            location: '강남구 선호',
            budget: '50만원대',
            sleep: '취침: 12시',
            lifestyle: '아침형'
        },
        {
            id: 2,
            name: '이민준',
            age: 28,
            avatar: '👨',
            mbti: 'ENTP',
            job: '개발자',
            location: '마포구 선호',
            budget: '60만원대',
            sleep: '취침: 1시',
            lifestyle: '저녁형'
        },
        {
            id: 3,
            name: '박소희',
            age: 24,
            avatar: '👩',
            mbti: 'INFP',
            job: '대학원생',
            location: '서대문구 선호',
            budget: '45만원대',
            sleep: '취침: 11시',
            lifestyle: '아침형'
        },
        {
            id: 4,
            name: '최현우',
            age: 27,
            avatar: '👨',
            mbti: 'ESTJ',
            job: '공무원',
            location: '송파구 선호',
            budget: '55만원대',
            sleep: '취침: 10시',
            lifestyle: '아침형'
        },
        {
            id: 5,
            name: '윤서진',
            age: 23,
            avatar: '👩',
            mbti: 'ESFP',
            job: '디자이너',
            location: '홍대 선호',
            budget: '48만원대',
            sleep: '취침: 2시',
            lifestyle: '야행성'
        },
        {
            id: 6,
            name: '정우성',
            age: 30,
            avatar: '👨',
            mbti: 'INTJ',
            job: '연구원',
            location: '강동구 선호',
            budget: '70만원대',
            sleep: '취침: 11시',
            lifestyle: '아침형'
        },
        {
            id: 7,
            name: '오하늘',
            age: 25,
            avatar: '👩',
            mbti: 'ISTP',
            job: '엔지니어',
            location: '용산구 선호',
            budget: '58만원대',
            sleep: '취침: 12시',
            lifestyle: '저녁형'
        },
        {
            id: 8,
            name: '배성훈',
            age: 29,
            avatar: '👨',
            mbti: 'ENTJ',
            job: '스타트업 CEO',
            location: '강남구 선호',
            budget: '80만원대',
            sleep: '취침: 1시',
            lifestyle: '야행성'
        },
        {
            id: 9,
            name: '이지수',
            age: 26,
            avatar: '👩',
            mbti: 'INFJ',
            job: '교사',
            location: '성동구 선호',
            budget: '52만원대',
            sleep: '취침: 10시 30분',
            lifestyle: '아침형'
        },
        {
            id: 10,
            name: '강도윤',
            age: 24,
            avatar: '👨',
            mbti: 'ISTJ',
            job: '학생',
            location: '노원구 선호',
            budget: '40만원대',
            sleep: '취침: 12시',
            lifestyle: '아침형'
        }
    ];


    return (
        <section className="roommate-section container">
            <h2 className="section-title">추천 룸메이트</h2>
            <div className="roommate-content">
                <div className="roommate-grid">
                    {roommates.slice(0, 5).map(roommate => (
                        <RoommateCard
                            key={roommate.id}
                            name={roommate.name}
                            age={roommate.age}
                            avatar={roommate.avatar}
                            mbti={roommate.mbti}
                            job={roommate.job}
                            location={roommate.location}
                            budget={roommate.budget}
                            sleep={roommate.sleep}
                            lifestyle={roommate.lifestyle}
                        />
                    ))}
                </div>
            </div>
        </section>

    );
}

export default RoommateSection;