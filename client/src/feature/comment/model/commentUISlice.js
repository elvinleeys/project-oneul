import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    postId: null,
    userEmail: null,
};

const commentUISlice = createSlice({
    name: "commentUI",

    initialState,

    reducers: {
        openSheet: (state, { payload }) => {
            state.isOpen = true;
            state.postId = payload.postId;
            state.userEmail = payload.userEmail;
        },

        closeSheet: (state) => {
            state.isOpen = false;
            state.postId = null;
            state.userEmail = null;
        },
    },
});

export const { openSheet, closeSheet } = commentUISlice.actions;

export default commentUISlice.reducer;
