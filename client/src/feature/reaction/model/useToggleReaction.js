import { useToggleReactionMutation } from "../../post/api/postApi";
import { useSelector } from "react-redux";

export const useToggleReaction = ({ postId, type, reacted }) => {
    const { tab } = useSelector((s) => s.post);
    const currentUser = useSelector((s) => s.login.currentUser);

    const [toggleReaction, { isLoading }] = useToggleReactionMutation();

    const handleToggleReaction = async () => {
        if (isLoading) return;

        try {
            await toggleReaction({
                postId,
                type,
                reacted,
                userEmail: currentUser.email,
                tab,
                email: currentUser.email,
            }).unwrap();
        } catch (e) {
            console.error(e);
        }
    };

    return {
        handleToggleReaction,
    };
};
