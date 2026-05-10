import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    name: "",
    mobile: "",
    nickname: "",
    profileImg: "",
    origin: "",
    token: "",
};

const signUpSlice = createSlice({
    name: "signup",
    initialState,

    reducers: {
        updateSignUpData: (state, action) => {
            Object.assign(state, action.payload);
        },

        resetSignUpData: () => initialState,
    },
});

export const { updateSignUpData, resetSignUpData } = signUpSlice.actions;

export default signUpSlice.reducer;
