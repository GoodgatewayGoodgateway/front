import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token');
    console.log('AuthGuard - isLoggedIn:', isLoggedIn);

    if (!isLoggedIn) {
        alert('로그인이 필요합니다.');
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthGuard;
