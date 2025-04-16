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
            localStorage.setItem('currentUser', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
            localStorage.removeItem('currentUser');
        },
    },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
