import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        nickName: null,
        isAuthenticated: false,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.succeed;
            state.nickName = action.payload.nickName;
            state.isAuthenticated = !!action.payload;
        },
        clearToken: (state) => {
            state.token = null;
            state.nickName = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;