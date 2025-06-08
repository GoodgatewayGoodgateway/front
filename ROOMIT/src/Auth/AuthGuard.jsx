import { useEffect } from 'react';

const AuthGuard = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        if (!isLoggedIn) {
            alert('로그인이 필요합니다.');
            window.history.back(); 
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return null; 
    }

    return children;
};

export default AuthGuard;
