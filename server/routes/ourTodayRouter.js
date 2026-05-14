import express from "express";
import { toggleOurTodayReaction } from "../controller/ourTodayPost/reaction.js";
import {
    createPostOurToday,
    deleteOurTodayPost,
    getMyTodayPost,
    getOurTodayBestPost,
    getOurTodayPost,
    updateOurTodayPost,
} from "../controller/ourTodayPost/ourToday.js";
import {
    createCommentOurToday,
    deleteOurTodayComment,
    getOurTodayComment,
    updateOurTodayComment,
} from "../controller/ourTodayPost/comment.js";

const ourTodayRouter = express.Router();

// 인기 게시글
ourTodayRouter.get("/posts/best", getOurTodayBestPost);

// 게시글
ourTodayRouter.get("/posts", getOurTodayPost);
ourTodayRouter.get("/posts/me", getMyTodayPost);
ourTodayRouter.post("/write", createPostOurToday);
ourTodayRouter.put("/update", updateOurTodayPost);
ourTodayRouter.delete("/delete", deleteOurTodayPost);

// 리액션
ourTodayRouter.put("/reaction", toggleOurTodayReaction);

// 댓글
ourTodayRouter.get("/checkPostComment/:postId", getOurTodayComment);
ourTodayRouter.post("/writeComment", createCommentOurToday);
ourTodayRouter.put("/updateComment", updateOurTodayComment);
ourTodayRouter.delete("/deleteComment", deleteOurTodayComment);

export default ourTodayRouter;
