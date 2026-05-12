import Reaction from "../../models/reactionSchema.js";

const VALID_REACTIONS = ["heart", "like", "smile", "sad", "angry"];

const toggleOurTodayReaction = async (req, res) => {
    try {
        const { id, userEmail, reactionType } = req.body;

        if (!VALID_REACTIONS.includes(reactionType)) {
            return res.status(400).json({
                message: "유효하지 않은 reaction type 입니다.",
            });
        }

        const filter = {
            postId: id,
            userEmail,
            type: reactionType,
        };

        const existing = await Reaction.findOne(filter);

        if (existing) {
            await Reaction.deleteOne(filter);

            return res.status(200).json({
                reacted: false,
                reactionType,
            });
        }

        await Reaction.create(filter);

        return res.status(200).json({
            reacted: true,
            reactionType,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "서버 에러",
        });
    }
};

export { toggleOurTodayReaction };
