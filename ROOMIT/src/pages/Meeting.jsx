import React from 'react';
import ProfileCard from '../components/User_Profile_Card';
import Header from '../components/Header';
import '../pages/css/Meeting.css';
const Meeting = ({ users }) => {
    return (
        <div className="roommates-list">
            <Header />
            <h1>룸메이트 매칭</h1>
            <h2>룸메이트를 찾아보세요!</h2>
            <div className="roommate-search-bar">
                <form className="filter-form">
                    <label>
                        나이대:
                        <select name="ageRange">
                            <option value="20-25">20-25</option>
                            <option value="26-30">26-30</option>
                            <option value="31-35">31-35</option>
                        </select>
                    </label>
                    <label>
                        흡연 여부:
                        <select name="smoking">
                            <option value="non-smoker">비흡연</option>
                            <option value="smoker">흡연</option>
                        </select>
                    </label>
                    <label>
                        활동 시간:
                        <select name="activityTime">
                            <option value="morning">아침형</option>
                            <option value="night">저녁형</option>
                        </select>
                    </label>                    <label>
                        음주 여부:
                        <select name="drinking">
                            <option value="morning">O</option>
                            <option value="night">X</option>
                        </select>
                    </label>
                    <button type="submit">필터 적용</button>
                </form>
            </div>
            <div className='roommate-list'>
                {
                    users.map(roommate => (
                        <ProfileCard key={roommate.id} {...roommate} />
                    ))
                }
            </div>
        </div>
    );
};

export default Meeting;