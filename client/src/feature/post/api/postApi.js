import { apiSlice } from "../../../shared/api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 게시글 조회
        getPosts: builder.query({
            query: ({ type, email }) => {
                if (type === "mine") {
                    return `/ourToday/checkMyPost/${email}`;
                }

                return `/ourToday/checkPost`;
            },

            providesTags: ["Post"],
        }),

        // 게시글 생성
        createPost: builder.mutation({
            query: (body) => ({
                url: "/ourToday/write",
                method: "POST",
                body,
            }),

            invalidatesTags: ["Post"],
        }),

        // 게시글 수정
        updatePost: builder.mutation({
            query: ({ postId, content }) => ({
                url: "/ourToday/update",
                method: "PUT",
                body: {
                    id: postId,
                    content,
                },
            }),

            invalidatesTags: ["Post"],
        }),

        // 게시글 삭제
        deletePost: builder.mutation({
            query: (postId) => ({
                url: "/ourToday/delete",
                method: "DELETE",
                body: {
                    _id: postId,
                },
            }),

            invalidatesTags: ["Post"],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postApi;
