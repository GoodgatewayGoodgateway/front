import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { User, Lock, Mail } from 'lucide-react';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import './css/Login.css';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isActive, setIsActive] = useState(location.state?.register ?? false);
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        setIsActive(location.state?.register ?? false);
    }, [location.state]);

    const handleRegisterClick = () => setIsActive(true);
    const handleLoginClick = () => setIsActive(false);

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const foundUser = users.find(user =>
            user.name === loginUsername && user.password === loginPassword
        );

        if (foundUser) {
            dispatch(login(foundUser));
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            navigate('/');
        } else {
            alert('❌ 로그인 정보가 올바르지 않습니다.');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const isEmailTaken = users.some(user => user.email === registerData.email);
        if (isEmailTaken) {
            alert("이미 등록된 이메일입니다.");
            return;
        }

        const newUser = {
            id: Date.now(),
            name: registerData.username,
            email: registerData.email,
            password: registerData.password,
        };

        const updatedUsers = [...users, newUser];
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        alert("회원가입 성공!");
        navigate('/login', { state: { register: false } });
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className='container_main'>
            <div className={`login_container ${isActive ? 'active' : ''}`}>
                {/* 로그인 폼 */}
                <div className="form-box login">
                    <form onSubmit={handleLogin}>
                        <h1>로그인</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="사용자 이름"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                required
                            />
                            <User className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                            <Lock className="icon" />
                        </div>
                        <div className="forgot-link">
                            <a href="#">비밀번호를 잊으셨나요?</a>
                        </div>
                        <button type="submit" className="btn">로그인</button>
                        <p>또는 소셜 계정으로 로그인</p>
                        <div className="social-icons">
                            <a href="#"><FaGoogle /></a>
                            <a href="#"><FaFacebook /></a>
                            <a href="#"><FaGithub /></a>
                            <a href="#"><FaLinkedin /></a>
                        </div>
                    </form>
                </div>

                {/* 회원가입 폼 */}
                <div className="form-box register">
                    <form onSubmit={handleRegister}>
                        <h1>회원가입</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                name="username"
                                placeholder="사용자 이름"
                                value={registerData.username}
                                onChange={handleRegisterChange}
                                required
                            />
                            <User className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="email"
                                name="email"
                                placeholder="이메일"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                            />
                            <Mail className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                            />
                            <Lock className="icon" />
                        </div>
                        <button type="submit" className="btn">가입하기</button>
                        <p>또는 소셜 계정으로 가입하기</p>
                        <div className="social-icons">
                            <a href="#"><FaGoogle /></a>
                            <a href="#"><FaFacebook /></a>
                            <a href="#"><FaGithub /></a>
                            <a href="#"><FaLinkedin /></a>
                        </div>
                    </form>
                </div>

                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>안녕하세요!</h1>
                        <p>아직 계정이 없으신가요?</p>
                        <button className="btn register-btn" onClick={handleRegisterClick}>
                            회원가입
                        </button>
                    </div>

                    <div className="toggle-panel toggle-right">
                        <h1>다시 오신 걸 환영해요!</h1>
                        <p>이미 계정이 있으신가요?</p>
                        <button className="btn login-btn" onClick={handleLoginClick}>
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
