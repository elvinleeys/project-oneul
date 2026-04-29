import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts } from "../api/postApi";

// 🔥 서버 연결 대비
export const fetchPosts = createAsyncThunk(
    "post/fetchPosts",
    async ({ type, email }) => {
        return await getPosts(type, email);
    },
);

const initialState = {
    tab: "all", // "all" | "mine"
    posts: [],
    status: "idle",
};

const postSlice = createSlice({
    name: "postList",
    initialState,
    reducers: {
        setTab: (state, { payload }) => {
            state.tab = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (s) => {
                s.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (s, { payload }) => {
                s.status = "success";
                s.posts = payload;
            })
            .addCase(fetchPosts.rejected, (s) => {
                s.status = "error";
            });
    },
});

export const { setTab } = postSlice.actions;
export default postSlice.reducer;
