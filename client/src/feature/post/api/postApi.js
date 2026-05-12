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

            providesTags: ["Post"],
        }),

        // 베스트 게시글 조회
        getBestPost: builder.query({
            query: (email) => `/ourToday/posts/best?email=${email}`,
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

                            if (reacted) {
                                post.reactions[type].count -= 1;
                                post.reactions[type].reacted = false;
                            } else {
                                post.reactions[type].count += 1;
                                post.reactions[type].reacted = true;
                            }
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

                            if (reacted) {
                                draft.reactions[type].count -= 1;
                                draft.reactions[type].reacted = false;
                            } else {
                                draft.reactions[type].count += 1;
                                draft.reactions[type].reacted = true;
                            }
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
