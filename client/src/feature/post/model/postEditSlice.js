import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    content: "",
};

const postEditorSlice = createSlice({
    name: "postEditor",
    initialState,
    reducers: {
        setContent: (state, { payload }) => {
            state.content = payload;
        },
        reset: () => initialState,
    },
});

export const { startCreate, startEdit, setContent, reset } =
    postEditorSlice.actions;
export default postEditorSlice.reducer;
