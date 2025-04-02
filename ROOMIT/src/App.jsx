import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Notfound from './pages/Notfound';
import Meeting from './pages/Meeting';
import Main from './pages/Main';
import Login from './pages/Login';
import userData from './data/userData';  // 유저 데이터 import
import MeetingDetail from './pages/MeetingDetail';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/meeting" element={<Meeting users={userData} />} />
          <Route path="/meeting/:id" element={<MeetingDetail userData={userData} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
