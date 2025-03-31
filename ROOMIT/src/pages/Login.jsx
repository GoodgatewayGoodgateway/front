import React, { useState } from 'react';
import { User, Lock, Mail, } from 'lucide-react';
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import './css/Login.css';
const Login = () => {
    const [isActive, setIsActive] = useState(false);

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    return (
        <div className='container_main'>
            <div className={`container ${isActive ? 'active' : ''}`}>
                <div className="form-box login">
                    <form action="#">
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Username" required />
                            <User className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required />
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

                <div className="form-box register">
                    <form action="#">
                        <h1>Registration</h1>
                        <div className="input-box">
                            <input type="text" placeholder="Username" required />
                            <User className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder="Email" required />
                            <Mail className="icon" />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder="Password" required />
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
