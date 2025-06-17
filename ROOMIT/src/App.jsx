import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import store from './app/store';
import { login } from './features/auth/authSlice';

import Header from './Components/Header';
import ScrollToTop from './Components/ScrollToTop';
import Notfound from './Pages/Notfound';
import Meeting from './Pages/Meeting';
import LivingSpace from './Pages/LivingSpace';
import Main from './Pages/Main';
import Login from './Pages/Login';
import MeetingDetail from './Pages/MeetingDetail';
import ChatRoom from './Pages/ChatRoom';
import MyPages from './Pages/MyPages';

// import userData from './Data/UserData';
import LivingSpaceData from './Data/LivingSpaceData';
import AuthGuard from './Auth/AuthGuard';
import GuestGuard from './Auth/GuestGuard';

// App.jsx
const AppContent = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('currentUser');

    if (token && storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(login({ token, user: parsedUser }));
        console.log('✅ 로그인 복원:', parsedUser);
      } catch (e) {
        console.error('⚠️ 사용자 정보 파싱 오류:', e);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
      }
    } else {
      console.warn('🚫 로그인 복원 불가: currentUser 없음 또는 잘못됨');
    }

    setIsReady(true);
  }, [dispatch]);

  if (!isReady) return null;

  const hideHeaderPaths = ['/login', '/logout'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <>
      {isReady && !shouldHideHeader && <Header />} {/* ✅ 수정: isReady 추가 */}
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/meeting/:id" element={<AuthGuard><MeetingDetail /></AuthGuard>} />
          <Route path="/housing" element={<LivingSpace LivingSpaceData={LivingSpaceData} />} />
          <Route path="/chat" element={<AuthGuard><ChatRoom /></AuthGuard>} />
          <Route path="/chat/:roomId" element={<AuthGuard><ChatRoom /></AuthGuard>} />
          <Route path="/mypages" element={<AuthGuard><MyPages /></AuthGuard>} />
          <Route path="/mypage/:id" element={<div>프로필 페이지</div>} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
};


const App = () => (
  <Provider store={store}>
    <Router>
      <AppContent />
    </Router>
  </Provider>
);

export default App;
