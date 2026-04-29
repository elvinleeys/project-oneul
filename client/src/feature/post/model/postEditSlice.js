import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "create", // "create" | "edit"
    postId: null,
    content: "",
};

const postEditorSlice = createSlice({
    name: "postEditor",
    initialState,
    reducers: {
        startCreate: (state) => {
            state.mode = "create";
            state.postId = null;
            state.content = "";
        },
        startEdit: (state, { payload }) => {
            state.mode = "edit";
            state.postId = payload.id;
            state.content = payload.content;
        },
        setContent: (state, { payload }) => {
            state.content = payload;
        },
        reset: () => initialState,
    },
});

export const { startCreate, startEdit, setContent, reset } =
    postEditorSlice.actions;
export default postEditorSlice.reducer;
