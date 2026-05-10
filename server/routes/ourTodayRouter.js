import express from "express";
import {
    createCommentOurToday,
    createPostOurToday,
    deleteOurTodayComment,
    deleteOurTodayPost,
    deleteOurTodayPostAngryReaction,
    deleteOurTodayPostHeartReaction,
    deleteOurTodayPostLikeReaction,
    deleteOurTodayPostSadReaction,
    deleteOurTodayPostSmileReaction,
    getMyTodayPost,
    getOurTodayBestPost,
    getOurTodayComment,
    getOurTodayPost,
    updateOurTodayComment,
    updateOurTodayPost,
    updateOurTodayPostAngryReaction,
    updateOurTodayPostHeartReaction,
    updateOurTodayPostLikeReaction,
    updateOurTodayPostSadReaction,
    updateOurTodayPostSmileReaction,
} from "../controller/ourTodayPost/ourToday.js";

const ourTodayRouter = express.Router();

ourTodayRouter.post("/write", createPostOurToday);
ourTodayRouter.put("/update", updateOurTodayPost);
ourTodayRouter.delete("/delete", deleteOurTodayPost);
ourTodayRouter.put("/plusPostHeartReaction", updateOurTodayPostHeartReaction);
ourTodayRouter.put("/minusPostHeartReaction", deleteOurTodayPostHeartReaction);
ourTodayRouter.put("/plusPostLikeReaction", updateOurTodayPostLikeReaction);
ourTodayRouter.put("/minusPostLikeReaction", deleteOurTodayPostLikeReaction);
ourTodayRouter.put("/plusPostSmileReaction", updateOurTodayPostSmileReaction);
ourTodayRouter.put("/minusPostSmileReaction", deleteOurTodayPostSmileReaction);
ourTodayRouter.put("/plusPostSadReaction", updateOurTodayPostSadReaction);
ourTodayRouter.put("/minusPostSadReaction", deleteOurTodayPostSadReaction);
ourTodayRouter.put("/plusPostAngryReaction", updateOurTodayPostAngryReaction);
ourTodayRouter.put("/minusPostAngryReaction", deleteOurTodayPostAngryReaction);
ourTodayRouter.post("/writeComment", createCommentOurToday);
ourTodayRouter.put("/updateComment", updateOurTodayComment);
ourTodayRouter.delete("/deleteComment", deleteOurTodayComment);
ourTodayRouter.get("/posts/best", getOurTodayBestPost);

ourTodayRouter.get("/checkPostComment/:postId", getOurTodayComment);
ourTodayRouter.get("/posts", getOurTodayPost);
ourTodayRouter.get("/posts/me", getMyTodayPost);

export default ourTodayRouter;
