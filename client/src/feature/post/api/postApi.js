import { apiSlice } from "../../../shared/api/apiSlice";

const endpointMap = {
    heart: {
        add: "plusPostHeartReaction",
        remove: "minusPostHeartReaction",
    },
    like: {
        add: "plusPostLikeReaction",
        remove: "minusPostLikeReaction",
    },
    smile: {
        add: "plusPostSmileReaction",
        remove: "minusPostSmileReaction",
    },
    sad: {
        add: "plusPostSadReaction",
        remove: "minusPostSadReaction",
    },
    angry: {
        add: "plusPostAngryReaction",
        remove: "minusPostAngryReaction",
    },
};

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

        // Reaction 토글
        toggleReaction: builder.mutation({
            query: ({ type, reacted, postId, userEmail }) => {
                const action = reacted ? "remove" : "add";

                return {
                    url: `/ourToday/${endpointMap[type][action]}`,
                    method: "PUT",
                    body: {
                        id: postId,
                        userEmail,
                    },
                };
            },

            async onQueryStarted(
                { postId, type, reacted, userEmail, tab, email },
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    postApi.util.updateQueryData(
                        "getPosts",
                        { type: tab, email },
                        (draft) => {
                            const post = draft.find((p) => p._id === postId);

                            if (!post) return;

                            if (reacted) {
                                post[type] = post[type].filter(
                                    (user) => user !== userEmail,
                                );
                            } else {
                                post[type].push(userEmail);
                            }
                        },
                    ),
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useToggleReactionMutation,
} = postApi;
