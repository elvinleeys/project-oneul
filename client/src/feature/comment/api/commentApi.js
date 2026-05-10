import { apiSlice } from "../../../shared/api/apiSlice";

export const commentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 댓글 조회
        getComments: builder.query({
            query: ({ postId, userEmail }) =>
                `/ourToday/checkPostComment/${postId}?userEmail=${userEmail}`,

            providesTags: (result, error, arg) => [
                { type: "Comment", id: arg.postId },
            ],
        }),

        // 댓글 생성
        createComment: builder.mutation({
            query: (body) => ({
                url: "/ourToday/writeComment",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "Comment", id: arg.postId },
                "Post",
            ],
        }),

        // 댓글 수정
        updateComment: builder.mutation({
            query: ({ id, commentText }) => ({
                url: "/ourToday/updateComment",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    id,
                    commentText,
                },
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "Comment", id: result.postId },
            ],
        }),

        // 댓글 삭제
        deleteComment: builder.mutation({
            query: ({ commentId }) => ({
                url: "/ourToday/deleteComment",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    _id: commentId,
                },
            }),

            invalidatesTags: (result, error, arg) => [
                { type: "Comment", id: arg.postId },
                "Post",
            ],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useCreateCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = commentApi;
