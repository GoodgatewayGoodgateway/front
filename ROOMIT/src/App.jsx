import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Notfound from './pages/Notfound';
import Meeting from './pages/Meeting';
import Main from './pages/Main';
import Login from './pages/Login';
import userData from './data/userData';  // 유저 데이터 import
import MeetingDetail from './pages/MeetingDetail';

const MeetingDetailWrapper = ({ users }) => {
  const { id } = useParams();
  const user = users.find(user => user.id === parseInt(id));

  if (!user) {
    return <div>사용자를 찾을 수 없습니다.</div>;
  }

  return <MeetingDetail user={user} />;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/meeting" element={<Meeting users={userData} />} />
          <Route path="/meeting/:id" element={<MeetingDetailWrapper users={userData} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
