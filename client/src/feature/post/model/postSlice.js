import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tab: "all",
};

const postSlice = createSlice({
    name: "post",

    initialState,

    reducers: {
        setTab: (state, { payload }) => {
            state.tab = payload;
        },
    },
});

export const { setTab } = postSlice.actions;

export default postSlice.reducer;
