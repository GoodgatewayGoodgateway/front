import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./Components/Header";
import Notfound from "./Pages/Notfound";
import Meeting from "./Pages/Meeting";
import LivingSpace from "./Pages/LivingSpace";
import Main from "./Pages/Main";
import Login from "./Pages/Login";
import MeetingDetail from "./Pages/MeetingDetail";
import LivingSpaceData from "./Data/LivingSpaceData"; // 주거공간 데이터 import
import LivingSpaceDetail from "./Pages/LivingSpaceDetail.jsx";
// import LivingSpaceListing from "./Pages/LivingSpaceListing";
import ChatRoom from "./Pages/ChatRoom";
import MyPages from "./Pages/MyPages";
import IncreaseKakaoMap from "./Pages/IncreaseKakaoMap.jsx";
import ScrollToTop from "./Components/ScrollToTop";
import Guide from "./Pages/Guide.jsx";

import AuthGuard from "./Auth/AuthGuard";
import GuestGuard from "./Auth/GuestGuard";

const AppContent = () => {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/logout"];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  // ✅ currentUser 상태 추가
  const [currentUser, setCurrentUser] = React.useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <>
      {!shouldHideHeader && <Header currentUser={currentUser} />}
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/login"
            element={
              <GuestGuard>
                <Login setCurrentUser={setCurrentUser} />
              </GuestGuard>
            }
          />
          <Route path="/meeting" element={<Meeting />} />
          <Route
            path="/meeting/:id"
            element={
              <AuthGuard>
                <MeetingDetail />
              </AuthGuard>
            }
          />
          <Route path="/housing" element={<LivingSpace />} />
          <Route path="/housing/:id" element={<LivingSpaceDetail />} />
          {/* <Route path="/housing/listing" element={<LivingSpaceListing />} /> */}
          <Route
            path="/housing/:id/map"
            element={<IncreaseKakaoMap LivingSpaceData={LivingSpaceData} />}
          />
          <Route
            path="/chat"
            element={
              <AuthGuard>
                <ChatRoom />
              </AuthGuard>
            }
          />
          <Route path="/Guide" element={<Guide />} />
          <Route
            path="/chat/:roomId"
            element={
              <AuthGuard>
                <ChatRoom />
              </AuthGuard>
            }
          />
          <Route
            path="/mypages"
            element={
              <AuthGuard>
                <MyPages currentUser={currentUser} setCurrentUser={setCurrentUser} />
              </AuthGuard>
            }
          />
          <Route path="/mypage/:id" element={<div>프로필 페이지</div>} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
