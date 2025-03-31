// Header.jsx
import React from 'react';
import './css/Header.css'; // Assuming you h

function Header() {
    return (
        <header className="header">
            <div className="logo">RoomIT</div>
            <nav className="nav">
                <ul className="nav-menu">
                    <li className="nav-item">홈</li>
                    <li className="nav-item">매칭</li>
                    <li className="nav-item">주거공간</li>
                    <li className="nav-item">커뮤니티</li>
                    <li className="nav-item">마이페이지</li>
                </ul>
            </nav>
            <div className="auth-buttons">
                <button className="btn-login">로그인</button>
                <button className="btn-signup">가입</button>
            </div>
        </header>
    );
}

export default Header;