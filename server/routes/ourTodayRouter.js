import express from "express";
import {
    createCommentOurToday,
    createPostOurToday,
    deleteOurTodayComment,
    deleteOurTodayPost,
    getMyTodayPost,
    getOurTodayBestPost,
    getOurTodayComment,
    getOurTodayPost,
    updateOurTodayComment,
    updateOurTodayPost,
} from "../controller/ourTodayPost/ourToday.js";
import { toggleOurTodayReaction } from "../controller/ourTodayPost/reaction.js";

const ourTodayRouter = express.Router();

ourTodayRouter.post("/write", createPostOurToday);
ourTodayRouter.put("/update", updateOurTodayPost);
ourTodayRouter.delete("/delete", deleteOurTodayPost);
ourTodayRouter.put("/reaction", toggleOurTodayReaction);
ourTodayRouter.post("/writeComment", createCommentOurToday);
ourTodayRouter.put("/updateComment", updateOurTodayComment);
ourTodayRouter.delete("/deleteComment", deleteOurTodayComment);
ourTodayRouter.get("/posts/best", getOurTodayBestPost);

ourTodayRouter.get("/checkPostComment/:postId", getOurTodayComment);
ourTodayRouter.get("/posts", getOurTodayPost);
ourTodayRouter.get("/posts/me", getMyTodayPost);

export default ourTodayRouter;
