import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Notfound from './pages/Notfound';
import Meeting from './pages/Meeting';
import Main from './pages/Main';
import Login from './pages/Login';
import userData from './data/userData';  // 유저 데이터 import
import MeetingDetail from './pages/MeetingDetail';
import ChatRoom from "./pages/ChatRoom";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/meeting" element={<Meeting users={userData} currentUser={currentUser} />} />
          <Route path="/meeting/:id" element={<MeetingDetail userData={userData} currentUser={currentUser} />} />
          <Route path="/chat/:roomId" element={<ChatRoom />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
