import { API_URL } from "../../../api/Api";

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

export const toggleReaction = async ({ type, reacted, postId, userEmail }) => {
    const action = reacted ? "remove" : "add";

    await fetch(`${API_URL}/ourToday/${endpointMap[type][action]}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: postId,
            userEmail,
        }),
    });
};
