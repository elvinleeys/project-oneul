import Comment from "../../models/ourTodayCommentSchema.js";

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

export {
    createCommentOurToday,
    getOurTodayComment,
    updateOurTodayComment,
    deleteOurTodayComment,
};
