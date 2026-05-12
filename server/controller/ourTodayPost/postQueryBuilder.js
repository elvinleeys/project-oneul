const REACTION_TYPES = ["heart", "like", "smile", "sad", "angry"];

export const buildPostPipeline = (email, isMineOnly = false) => {
    const pipeline = [];

    if (isMineOnly) {
        pipeline.push({
            $match: {
                userEmail: email,
            },
        });
    }

    pipeline.push(
        // 댓글 개수 조회
        {
            $lookup: {
                from: "comment",
                let: { postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$postId", "$$postId"],
                            },
                        },
                    },
                    {
                        $count: "count",
                    },
                ],
                as: "commentData",
            },
        },

        // reaction aggregation
        {
            $lookup: {
                from: "reaction",
                let: { postId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$postId", "$$postId"],
                            },
                        },
                    },

                    // type별 그룹화
                    {
                        $group: {
                            _id: "$type",

                            count: {
                                $sum: 1,
                            },

                            users: {
                                $push: "$userEmail",
                            },
                        },
                    },
                ],
                as: "reactionData",
            },
        },

        // 응답 구조 생성
        {
            $addFields: {
                commentCount: {
                    $ifNull: [
                        {
                            $arrayElemAt: ["$commentData.count", 0],
                        },
                        0,
                    ],
                },

                isMine: {
                    $eq: ["$userEmail", email],
                },

                reactions: {
                    $arrayToObject: {
                        $map: {
                            input: REACTION_TYPES,
                            as: "type",
                            in: {
                                k: "$$type",

                                v: {
                                    $let: {
                                        vars: {
                                            matchedReaction: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: "$reactionData",
                                                            as: "reaction",
                                                            cond: {
                                                                $eq: [
                                                                    "$$reaction._id",
                                                                    "$$type",
                                                                ],
                                                            },
                                                        },
                                                    },
                                                    0,
                                                ],
                                            },
                                        },

                                        in: {
                                            count: {
                                                $ifNull: [
                                                    "$$matchedReaction.count",
                                                    0,
                                                ],
                                            },

                                            reacted: {
                                                $in: [
                                                    email,
                                                    {
                                                        $ifNull: [
                                                            "$$matchedReaction.users",
                                                            [],
                                                        ],
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        // 불필요 필드 제거
        {
            $project: {
                commentData: 0,
                reactionData: 0,
            },
        },
    );

    return pipeline;
};
