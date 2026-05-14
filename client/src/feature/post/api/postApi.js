import { apiSlice } from "../../../shared/api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 게시글 조회
        getPosts: builder.query({
            query: ({ type, email }) => {
                if (type === "mine") {
                    return `/ourToday/posts/me?email=${email}`;
                }

                return `/ourToday/posts?email=${email}`;
            },

            providesTags: (result) =>
                result
                    ? [
                          ...result.map((post) => ({
                              type: "Post",
                              id: post._id,
                          })),
                          { type: "Post", id: "LIST" },
                      ]
                    : [{ type: "Post", id: "LIST" }],
        }),

        // 베스트 게시글 조회
        getBestPost: builder.query({
            query: (email) => `/ourToday/posts/best?email=${email}`,
            providesTags: (result) =>
                result ? [{ type: "Post", id: result._id }] : [],
        }),

        // 게시글 생성
        createPost: builder.mutation({
            query: (body) => ({
                url: "/ourToday/write",
                method: "POST",
                body,
            }),

            invalidatesTags: [{ type: "Post", id: "LIST" }],
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

            invalidatesTags: (_, __, { postId }) => [
                { type: "Post", id: postId },
            ],
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

            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),

        // Reaction 토글
        toggleReaction: builder.mutation({
            query: ({ type, postId, userEmail }) => ({
                url: "/ourToday/reaction",
                method: "PUT",
                body: {
                    id: postId,
                    userEmail,
                    reactionType: type,
                },
            }),

            invalidatesTags: (_, __, { postId }) => [
                { type: "Post", id: postId },
            ],

            async onQueryStarted(
                { postId, type, reacted, userEmail, tab, email },
                { dispatch, queryFulfilled },
            ) {
                // ourToday 목록 캐시 optimistic update
                const postsPatch = dispatch(
                    postApi.util.updateQueryData(
                        "getPosts",
                        { type: tab, email },
                        (draft) => {
                            const post = draft.find((p) => p._id === postId);

                            if (!post) return;

                            post.reactions[type].count += reacted ? -1 : 1;
                            post.reactions[type].reacted = !reacted;
                        },
                    ),
                );

                // bestPost 캐시 optimistic update
                const bestPostPatch = dispatch(
                    postApi.util.updateQueryData(
                        "getBestPost",
                        email,
                        (draft) => {
                            if (!draft || draft._id !== postId) return;

                            draft.reactions[type].count += reacted ? -1 : 1;
                            draft.reactions[type].reacted = !reacted;
                        },
                    ),
                );

                try {
                    await queryFulfilled;
                } catch {
                    postsPatch.undo();
                    bestPostPatch.undo();
                }
            },
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetBestPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useToggleReactionMutation,
} = postApi;
