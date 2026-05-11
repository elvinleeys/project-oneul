import OurToday from "../../models/ourTodaySchema.js";
import Reaction from "../../models/reactionSchema.js";

const VALID_REACTIONS = ["heart", "like", "smile", "sad", "angry"];

const toggleOurTodayReaction = async (req, res) => {
    console.time("toggleReaction");

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

        // 제거
        if (existing) {
            await Reaction.deleteOne(filter);

            // legacy 배열 동기화
            await OurToday.updateOne(
                { _id: id },
                {
                    $pull: {
                        [reactionType]: userEmail,
                    },
                },
            );

            return res.status(200).json({
                reacted: false,
                reactionType,
            });
        }

        // 추가
        await Reaction.create(filter);

        // legacy 배열 동기화
        await OurToday.updateOne(
            { _id: id },
            {
                $addToSet: {
                    [reactionType]: userEmail,
                },
            },
        );

        return res.status(200).json({
            reacted: true,
            reactionType,
        });
    } catch (error) {
        console.error("reaction toggle 실패:", error);

        return res.status(500).json({
            message: "서버 에러가 발생했습니다.",
        });
    } finally {
        console.timeEnd("toggleReaction");
    }
};

export { toggleOurTodayReaction };
