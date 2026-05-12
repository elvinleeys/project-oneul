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

        // 위 req.body에 포함된 내용이 담긴 데이터 객체 생성
        const savedPost = await OurToday.create(postDetails);

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

        const pipeline = [
            ...buildPostPipeline(email),
            {
                $sort: {
                    _id: -1,
                },
            },
        ];

        const posts = await OurToday.aggregate(pipeline);

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

        const pipeline = [
            ...buildPostPipeline(email, true),
            {
                $sort: { _id: -1 },
            },
        ];

        const posts = await OurToday.aggregate(pipeline);

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

const getOurTodayBestPost = async (req, res) => {
    try {
        const { email } = req.query;

        const pipeline = [
            ...buildPostPipeline(email),

            // heart 기준 계산
            {
                $addFields: {
                    heartCount: {
                        $ifNull: ["$reactions.heart.count", 0],
                    },
                },
            },

            // DB 레벨 정렬 (중요)
            {
                $sort: {
                    heartCount: -1,
                    _id: -1,
                },
            },

            // 1개만
            {
                $limit: 1,
            },

            // 불필요 필드 제거 (optional)
            {
                $project: {
                    comments: 0,
                    reactionDocs: 0,
                    heartCount: 0,
                },
            },
        ];

        const [bestPost] = await OurToday.aggregate(pipeline);

        if (!bestPost) {
            return res.status(404).json({
                message: "게시글이 존재하지 않습니다.",
            });
        }

        return res.status(200).json(bestPost);
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
    getOurTodayBestPost,
};
