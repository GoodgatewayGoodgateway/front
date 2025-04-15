import { createSlice } from '@reduxjs/toolkit';

// src/features/auth/authSlice.jss
const savedUser = JSON.parse(localStorage.getItem('currentUser'));

const initialState = {
    isLoggedIn: !!savedUser,
    currentUser: savedUser,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
            localStorage.setItem('currentUser', JSON.stringify(action.payload)); // 현재 로그인 유저 저장
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
            localStorage.removeItem('currentUser'); // 로그인 상태 제거
        },
    },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
