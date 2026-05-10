import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    type: null, // "deleteComment" | "deletePost"
    targetId: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, { payload }) => {
            state.isOpen = true;
            state.type = payload.type;
            state.targetId = payload.targetId;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.type = null;
            state.targetId = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
