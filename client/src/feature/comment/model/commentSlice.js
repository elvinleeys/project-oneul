import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        isOpen: false,
        comments: [
            {
                id: 1,
                author: "박영한",
                text: "우와 저도 엄청 공감돼요! 내일 하루도 힘내세용!><",
                time: "2분 전",
                isMine: false,
            },
            {
                id: 2,
                author: "이한영",
                text: "우와 저도 엄청 공감돼요! 내일 하루도 힘내세용!><",
                time: "5분 전",
                isMine: true,
            },
            {
                id: 3,
                author: "박영한",
                text: "우와 저도 엄청 공감돼요! 내일 하루도 힘내세용!><",
                time: "8분 전",
                isMine: false,
            },
        ],
    },
    reducers: {
        openSheet: (s) => {
            s.isOpen = true;
        },
        closeSheet: (s) => {
            s.isOpen = false;
        },
        addComment: (s, { payload }) => {
            s.comments.unshift({
                id: Date.now(),
                author: "이한영",
                text: payload,
                time: "방금",
                likes: 0,
                isMine: true,
            });
        },
        editComment: (s, { payload: { id, text } }) => {
            const c = s.comments.find((c) => c.id === id);
            if (c) c.text = text;
        },
        deleteComment: (s, { payload }) => {
            s.comments = s.comments.filter((c) => c.id !== payload);
        },
    },
});

export const {
    openSheet,
    closeSheet,
    addComment,
    editComment,
    deleteComment,
    toggleLike,
} = commentSlice.actions;
export default commentSlice.reducer;
