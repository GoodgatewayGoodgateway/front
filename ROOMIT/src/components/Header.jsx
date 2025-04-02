import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 (테스트용)

    const handleLogout = () => {
        setIsLoggedIn(false); // 로그아웃 처리
        // 실제 로그아웃 로직 추가 (예: localStorage.clear() 또는 API 호출)
    };

    return (
        <header className="header">
            <div className="logo">RoomIT</div>
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
                        <Link to="/community">커뮤니티</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/mypage">마이페이지</Link>
                    </li>
                </ul>
            </nav>

            <div className="auth-buttons">
                {isLoggedIn ? (
                    <div className="profile-section">
                        <Link to="/mypage">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="프로필"
                                className="profile_image"
                            />
                        </Link>
                        <Link to="/mypage">
                            <button className="btn-profile">프로필 관리</button>
                        </Link>
                        <button className="btn-logout" onClick={handleLogout}>로그아웃</button>
                    </div>
                ) : (
                    <>
                        <Link to="/login" state={{ register: false }}>
                            <button className="btn-login">로그인</button>
                        </Link>
                        <Link to="/login" state={{ register: true }}>
                            <button className="btn-signup">가입</button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
