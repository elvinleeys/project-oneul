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
        {
            $lookup: {
                from: "comment",
                localField: "_id",
                foreignField: "postId",
                as: "comments",
            },
        },
        {
            $lookup: {
                from: "reaction",
                localField: "_id",
                foreignField: "postId",
                as: "reactionDocs",
            },
        },
        {
            $addFields: {
                commentCount: {
                    $size: "$comments",
                },

                isMine: {
                    $eq: ["$userEmail", email],
                },

                reactions: {
                    heart: {
                        count: {
                            $size: {
                                $filter: {
                                    input: "$reactionDocs",
                                    as: "reaction",
                                    cond: {
                                        $eq: ["$$reaction.type", "heart"],
                                    },
                                },
                            },
                        },

                        reacted: {
                            $in: [
                                email,
                                {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$reactionDocs",
                                                as: "reaction",
                                                cond: {
                                                    $eq: [
                                                        "$$reaction.type",
                                                        "heart",
                                                    ],
                                                },
                                            },
                                        },
                                        as: "reaction",
                                        in: "$$reaction.userEmail",
                                    },
                                },
                            ],
                        },
                    },

                    like: {
                        count: {
                            $size: {
                                $filter: {
                                    input: "$reactionDocs",
                                    as: "reaction",
                                    cond: {
                                        $eq: ["$$reaction.type", "like"],
                                    },
                                },
                            },
                        },

                        reacted: {
                            $in: [
                                email,
                                {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$reactionDocs",
                                                as: "reaction",
                                                cond: {
                                                    $eq: [
                                                        "$$reaction.type",
                                                        "like",
                                                    ],
                                                },
                                            },
                                        },
                                        as: "reaction",
                                        in: "$$reaction.userEmail",
                                    },
                                },
                            ],
                        },
                    },

                    smile: {
                        count: {
                            $size: {
                                $filter: {
                                    input: "$reactionDocs",
                                    as: "reaction",
                                    cond: {
                                        $eq: ["$$reaction.type", "smile"],
                                    },
                                },
                            },
                        },

                        reacted: {
                            $in: [
                                email,
                                {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$reactionDocs",
                                                as: "reaction",
                                                cond: {
                                                    $eq: [
                                                        "$$reaction.type",
                                                        "smile",
                                                    ],
                                                },
                                            },
                                        },
                                        as: "reaction",
                                        in: "$$reaction.userEmail",
                                    },
                                },
                            ],
                        },
                    },

                    sad: {
                        count: {
                            $size: {
                                $filter: {
                                    input: "$reactionDocs",
                                    as: "reaction",
                                    cond: {
                                        $eq: ["$$reaction.type", "sad"],
                                    },
                                },
                            },
                        },

                        reacted: {
                            $in: [
                                email,
                                {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$reactionDocs",
                                                as: "reaction",
                                                cond: {
                                                    $eq: [
                                                        "$$reaction.type",
                                                        "sad",
                                                    ],
                                                },
                                            },
                                        },
                                        as: "reaction",
                                        in: "$$reaction.userEmail",
                                    },
                                },
                            ],
                        },
                    },

                    angry: {
                        count: {
                            $size: {
                                $filter: {
                                    input: "$reactionDocs",
                                    as: "reaction",
                                    cond: {
                                        $eq: ["$$reaction.type", "angry"],
                                    },
                                },
                            },
                        },

                        reacted: {
                            $in: [
                                email,
                                {
                                    $map: {
                                        input: {
                                            $filter: {
                                                input: "$reactionDocs",
                                                as: "reaction",
                                                cond: {
                                                    $eq: [
                                                        "$$reaction.type",
                                                        "angry",
                                                    ],
                                                },
                                            },
                                        },
                                        as: "reaction",
                                        in: "$$reaction.userEmail",
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        },
        {
            $project: {
                comments: 0,
                reactionDocs: 0,

                // legacy 배열 제거
                heart: 0,
                like: 0,
                smile: 0,
                sad: 0,
                angry: 0,
            },
        },
        {
            $sort: {
                _id: -1,
            },
        },
    );

    return pipeline;
};
