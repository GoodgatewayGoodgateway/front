import { Navigate } from 'react-router-dom';

const GuestGuard = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token');
    console.log('GuestGuard - isLoggedIn:', isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestGuard;
