import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { User, Lock, Mail } from 'lucide-react';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import './css/Login.css';

const Login = ({ setCurrentUser }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // 🔁 location.state를 기반으로 isActive 설정
    const [isActive, setIsActive] = useState(location.state?.register ?? false);

    // 🔄 location.state 변경 시마다 isActive 갱신
    useEffect(() => {
        setIsActive(location.state?.register ?? false);
    }, [location.state]);

    // ✅ 입력 상태
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleRegisterClick = () => setIsActive(true);
    const handleLoginClick = () => setIsActive(false);

    // 🔐 로그인 처리
    const handleLogin = (e) => {
        e.preventDefault();

        const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

        if (
            savedUser &&
            savedUser.name === loginUsername &&
            savedUser.password === loginPassword
        ) {
            setCurrentUser(savedUser);
            localStorage.setItem('currentUser', JSON.stringify(savedUser)); // 추가!
            navigate('/');
        } else {
            alert('❌ 로그인 정보가 올바르지 않습니다.');
        }

    };

    // 📝 회원가입 처리
    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            id: Math.floor(Math.random() * 10000),
            name: registerData.username,
            email: registerData.email,
            password: registerData.password,
        };

        localStorage.setItem('registeredUser', JSON.stringify(newUser));

        // 🔁 로그인 페이지로 이동 + 상태도 전달
        navigate('/login', { state: { register: false } });
    };

    // 📥 회원가입 폼 값 변경 핸들링
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
                        <h1>Login</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Username"
                                value={loginUsername}
                                onChange={(e) => setLoginUsername(e.target.value)}
                                required
                            />
                            <User className="icon" />
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                required
                            />
                            <Lock className="icon" />
                        </div>
                        <div className="forgot-link">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" className="btn">Login</button>
                        <p>or login with social platforms</p>
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
                        <h1>Registration</h1>
                        <div className="input-box">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
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
                                placeholder="Email"
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
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                            />
                            <Lock className="icon" />
                        </div>
                        <button type="submit" className="btn">Register</button>
                        <p>or register with social platforms</p>
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
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button className="btn register-btn" onClick={handleRegisterClick}>
                            Register
                        </button>
                    </div>


                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button className="btn login-btn" onClick={handleLoginClick}>
                            Login
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
