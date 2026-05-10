import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: {},
    isLogin: false,
    previousURL: "",
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setPreviousURL: (state, action) => {
            state.previousURL = action.payload;
        },

        setUser: (state, action) => {
            state.currentUser = action.payload;
        },

        setUserStatus: (state, action) => {
            state.isLogin = action.payload;
        },

        setUserLogout: (state) => {
            state.currentUser = {};
            state.isLogin = false;
        },

        deleteUser: (state) => {
            state.currentUser = {};
            state.isLogin = false;
        },
    },
});

export const {
    setPreviousURL,
    setUser,
    setUserStatus,
    setUserLogout,
    deleteUser,
} = loginSlice.actions;

export default loginSlice.reducer;
