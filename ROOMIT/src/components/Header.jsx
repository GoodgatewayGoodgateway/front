import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice"; // 리덕스에서 logout 액션 임포트
import "./css/Header.css";
import profileImage from "../Data/profile.png";

function Header() {
  const dispatch = useDispatch(); // 리덕스 디스패치
  const currentUser = useSelector((state) => state.auth.currentUser); // 리덕스에서 currentUser 가져오기
  const isLoggedIn = !!currentUser;

  const chatRooms = []; // chatRooms가 어디에서 오는지에 따라 수정해야 합니다.
  const unreadUserCount = chatRooms ? chatRooms.filter((room) => room.unread > 0).length : 0;

  const handleLogout = () => {
    dispatch(logout()); // 로그아웃 액션 디스패치
    localStorage.removeItem("currentUser"); // 로컬스토리지에서 로그인 정보 제거
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/ROMMITlogo.svg" alt="로고" className="logo-image" width="40px" />
        ROOMIT
      </div>
      <nav className="nav">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/">홈</Link>
          </li>
          <li className="nav-item">
            <Link to="/meeting">매칭</Link>
          </li>
          <li className="nav-item">
            <Link to="/housing">주거공간</Link>
          </li>
          <li className="nav-item">
            <Link to="/chat">
              채팅
              {unreadUserCount > 0 && <span className="unread-user-badge">{unreadUserCount}</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mypages">마이페이지</Link>
          </li>
        </ul>
      </nav>

      <div className="auth-buttons">
        {isLoggedIn ? (
          <div className="header-profile-section">
            <Link to="/mypage">
              <img src={profileImage} alt="프로필" className="profile_image" />
            </Link>
            <Link to="/mypages">
              <button className="btn-profile">프로필 관리</button>
            </Link>
            <button className="btn-logout" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        ) : (
          <div className="header-login-section">
            <Link to="/login" state={{ register: false }}>
              <button className="btn-login">로그인</button>
            </Link>
            <Link to="/login" state={{ register: true }}>
              <button className="btn-signup">가입</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default React.memo(Header);
