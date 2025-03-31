import React from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

function Header() {
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
                <Link to="/login" state={{ register: false }}>
                    <button className="btn-login">로그인</button>
                </Link>
                <Link to="/login" state={{ register: true }}>
                    <button className="btn-signup">가입</button>
                </Link>

            </div>
        </header>
    );
}

export default Header;
