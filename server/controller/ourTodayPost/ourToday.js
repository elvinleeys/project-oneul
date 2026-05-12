import OurToday from "../../models/ourTodaySchema.js";
import User from "../../models/userSchema.js";
import Comment from "../../models/ourTodayCommentSchema.js";
import { buildPostPipeline } from "./postQueryBuilder.js";
import Reaction from "../../models/reactionSchema.js";

// 게시글 생성을 위한 controller 함수
const createPostOurToday = async (req, res) => {
    console.log(req.body);
    try {
        // 요청 본문에서 이메일을 사용하여 사용자 조회
        const user = await User.findOne({ email: req.body.userEmail });
        console.log("findOne 실행");
        // 게시글 작성 데이터
        const postDetails = {
            userEmail: req.body.userEmail,
            content: req.body.content,
            userProfileImg: req.body.userProfileImg,
            userNickname: req.body.userNickname,
        };

        // 새 게시글 생성
        // const newPost = new OurToday(postDetails);
        // console.log("새 게시글 생성")
        // // 데이터베이스에 게시글 저장
        // const savedPost = await newPost.save();
        // console.log("게시글 db 저장")
        // console.log(postDetails);
        // await OurToday.create(postDetails);

        // 위 req.body에 포함된 내용이 담긴 데이터 객체 생성
        const savedPost = await OurToday.create(postDetails);
        // console.log(savedPost);
        // console.log("게시글 저장")

        // 성공적으로 저장되면 201 코드와 함께 게시글 데이터 반환
        return res.status(201).json({
            registerSuccess: true,
            post: savedPost,
        });
    } catch (error) {
        //에러 발생 시 500 코드와 함께 에러 메시지 반환
        return res.status(500).json({
            registerSuccess: false,
            message: error.message,
        });
    }
};

// 게시글의 데이터 정보를 response에 담아줄 함수
const getOurTodayPost = async (req, res) => {
    try {
        const { email } = req.query;

        const posts = await OurToday.aggregate(buildPostPipeline(email));

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

const getMyTodayPost = async (req, res) => {
    try {
        const { email } = req.query;

        const posts = await OurToday.aggregate(buildPostPipeline(email, true));

        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// 게시글 수정시 실행될 controller 함수
const updateOurTodayPost = async (req, res) => {
    try {
        // 해당 게시글 id와 일치하는 게시글을 찾아와 JS 객체로 정보를 담은뒤
        const findPost = await OurToday.findOne({ _id: req.body.id }).lean();
        // 해당 수정될 게시글 내용을 content라는 변수에 담고
        const content = req.body.content;
        // 게시글의 id를 객체에 담고
        const post = { _id: findPost._id };
        // 수정될 내용을 key와 value값으로 짝지어 객체에 담고
        const updatedPost = { content: content };
        // 해당 게시글의 id와 일치하는 게시글의 내용을 updatedPost로 수정
        await OurToday.updateOne(post, { $set: updatedPost });
        // 수정된 내용을 다시 조회
        const getPost = await OurToday.findOne({ _id: req.body.id }).lean();
        res.status(200).json(getPost);
    } catch (error) {
        console.error("데이터 업데이트 실패:", error);
        res.status(500).json({ message: "서버 에러가 발생했습니다." });
    }
};

// 게시글 삭제를 위한 controller함수
const deleteOurTodayPost = async (req, res) => {
    try {
        // 삭제할 게시글의 id를 deletedId 변수에 저장
        const deletedId = req.body._id;
        // 해당 삭제할 게시글을 조회
        const deletedPost = await OurToday.findOne({ _id: deletedId }).lean();
        // console.log("게시글 확인")
        // console.log(deletedPost)
        // const deletedComment = await Comment.find({postId: deletedId}).lean();
        // console.log("댓글 확인")
        // console.log(deletedComment)

        // 다시 삭제할 게시글의 id를 deletedPostId에 저장하고
        const deletedPostId = deletedPost._id;
        // console.log("찾은 아이디", deletedPost)
        // 우선 관련 게시글의 댓글을 모두 삭제하고
        await Promise.all([
            Comment.deleteMany({ postId: deletedPostId }),
            Reaction.deleteMany({ postId: deletedPostId }),
        ]);
        // console.log("관련 댓글 삭제 완료")
        // 해당 게시글을 삭제한다.
        await OurToday.deleteOne({ _id: deletedPostId });
        // console.log("관련 게시글 삭제 완료")
        res.status(200).json({ message: "데이터 삭제 성공" });
    } catch (error) {
        // 에러 발생 시 클라이언트에 에러 응답 전송
        console.error("데이터 삭제 중 에러:", error);
        res.status(500).json({ error: "데이터 삭제에 실패했습니다." });
    }
};

// 게시글의 댓글을 생성할 controller
const createCommentOurToday = async (req, res) => {
    try {
        // req.body에 담겨있는 정보를 비구조화 할당으로 분해 후
        const {
            postId,
            commentUserNickName,
            commentText,
            commentUser,
            commentProfileImg,
        } = req.body;
        // commentDetail이라는 객체를 선언하여 해당 req.body 정보를
        // key와 value로 짝지어 데이터 저장
        const commentDetail = {
            postId: postId,
            commentText: commentText,
            commentUser: commentUser,
            commentUserNickName: commentUserNickName,
            commentProfileImg: commentProfileImg,
            createdAt: new Date().toISOString(),
        };
        // 위에서 선언한 commentDetail정보를 토대로 Comment Schema에 comment정보 생성
        const savedComment = await Comment.create(commentDetail);
        res.status(201).json(savedComment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Failed to create comment", error });
    }
};

// 댓글의 정보를 불러올 controller
const getOurTodayComment = async (req, res) => {
    try {
        // fetch 경로에 할당된 params를 비구조화 할당을 통해
        // postId로 분리
        const { postId } = req.params;
        const { userEmail } = req.query;
        // console.log("댓글 fetch요청")
        // console.log(postId);
        // 위에서 분해한 postId에 해당하는 댓글들을 조회
        const comments = await Comment.find({ postId }).sort({ _id: -1 });
        // console.log(comments);

        const formattedComments = comments.map((comment) => ({
            _id: comment._id,
            author: comment.commentUserNickName,
            profileImg: comment.commentProfileImg,
            text: comment.commentText,
            time: comment.createdAt,
            isMine: comment.commentUser === userEmail,
        }));
        // 댓글들이 존재한다면
        if (comments) {
            return res.status(200).json({
                comments: formattedComments,
                commentCount: formattedComments.length,
            });
        } else {
            return res.status(404).json({
                message: "댓글이 존재하지 않습니다.",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// 댓글의 수정을 실행할 controller
const updateOurTodayComment = async (req, res) => {
    try {
        // 해당 req.body에 담겨있는 id에 해당하는 댓글 조회
        const findComment = await Comment.findOne({ _id: req.body.id }).lean();
        // req.body에는 commentText로 댓글의 수정 내용이 담겨있고
        // commentText라는 변수에 담는다.
        const commentText = req.body.commentText;
        // _id라는 key값에 조회된 findComment의 id를 value로 짝지어
        // comment라는 객체에 담는다.
        const comment = { _id: findComment._id };
        // 수정된 댓글의 내용을 key와 value로 짝지어 updatedComment라는 변수에 담는다.
        const updatedComment = { commentText: commentText };
        // updateOne 쿼리를 통해 해당 comment, 즉 id에 해당하는 댓글의 내용을
        // updatedComment로 수정한다.
        await Comment.updateOne(comment, { $set: updatedComment });
        // 수정된 댓글을 조회한다.
        const getComment = await Comment.findOne({ _id: req.body.id }).lean();
        res.status(200).json(getComment);
    } catch (error) {
        console.error("데이터 업데이트 실패:", error);
        res.status(500).json({ message: "서버 에러가 발생했습니다." });
    }
};

// 댓글을 삭제할 controller 구성
const deleteOurTodayComment = async (req, res) => {
    try {
        // req.body에 담겨있는 id는 삭제할 해당 댓글의 id이므로
        //  deletedId 변수에 담는다.
        const deletedId = req.body._id;
        // deleteOne 쿼리를 통해 deletedId에 해당하는 댓글을 삭제
        await Comment.deleteOne({ _id: deletedId });
        res.status(200).json({ message: "데이터 삭제 성공" });
    } catch (error) {
        // 에러 발생 시 클라이언트에 에러 응답 전송
        console.error("데이터 삭제 중 에러:", error);
        res.status(500).json({ error: "데이터 삭제에 실패했습니다." });
    }
};

const getOurTodayBestPost = async (req, res) => {
    try {
        const { email } = req.query;

        const pipeline = [
            ...buildPostPipeline(email),

            // 🔥 핵심: heart 기준 정렬을 DB에서 처리
            {
                $addFields: {
                    heartCount: {
                        $ifNull: ["$reactions.heart.count", 0],
                    },
                },
            },

            {
                $sort: {
                    heartCount: -1,
                    _id: -1,
                },
            },

            {
                $limit: 1,
            },
        ];

        const bestPost = await OurToday.aggregate(pipeline);

        if (!bestPost.length) {
            return res.status(404).json({
                message: "게시글이 존재하지 않습니다.",
            });
        }

        return res.status(200).json(bestPost[0]);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export {
    createPostOurToday,
    getOurTodayPost,
    getMyTodayPost,
    updateOurTodayPost,
    deleteOurTodayPost,
    createCommentOurToday,
    getOurTodayComment,
    updateOurTodayComment,
    deleteOurTodayComment,
    getOurTodayBestPost,
};
