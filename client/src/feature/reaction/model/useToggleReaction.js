import { useState } from "react";
import { toggleReaction } from "../api/toggleReaction";

export const useToggleReaction = ({
    postId,
    type,
    count,
    reacted,
    userEmail,
}) => {
    const [isActive, setIsActive] = useState(reacted);
    const [cnt, setCnt] = useState(count);
    const [loading, setLoading] = useState(false);

    const handleToggleReaction = async () => {
        if (loading) return;

        setLoading(true);

        // optimistic update
        setIsActive((prev) => !prev);
        setCnt((prev) => (isActive ? prev - 1 : prev + 1));

        try {
            await toggleReaction({
                postId,
                type,
                reacted: isActive,
                userEmail,
            });
        } catch (e) {
            // rollback
            setIsActive((prev) => !prev);
            setCnt((prev) => (isActive ? prev + 1 : prev - 1));
        } finally {
            setLoading(false);
        }
    };

    return {
        isActive,
        cnt,
        handleToggleReaction,
    };
};
