import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Notfound from './Pages/Notfound';
import Meeting from './Pages/Meeting';
import Main from './Pages/Main';
import Login from './Pages/Login';
import userData from './Data/UserData';  // 유저 데이터 import
import MeetingDetail from './Pages/MeetingDetail';
import ChatRoom from "./Pages/ChatRoom";
import MyPages from './Pages/MyPages';

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
          <Route path="/" element={<Main userData={userData} currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/meeting" element={<Meeting users={userData} currentUser={currentUser} />} />
          <Route path="/meeting/:id" element={<MeetingDetail userData={userData} currentUser={currentUser} />} />
          <Route path="/chat/:roomId" element={<ChatRoom />} />
          <Route path="/mypages" element={<MyPages currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
