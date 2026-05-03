import React, { useEffect, useState } from "react";
import S from "./style";
import Comment from "./Comment";
import { API_URL } from "../../shared/api/apiSlice";

const CommentContainer = ({
    post,
    showWindow,
    setOurTodayCommentUpdate,
    ourTodayCommentUpdate,
    getCommentLength,
    handleCommentModal,
}) => {
    // 댓글 데이터 정보를 담기 위한 상태관리
    const [comments, setComments] = useState();
    // post id를 저장하기 위한 postId 변수 선언
    const postId = post._id;

    // 댓글 데이터 정보를 얻기 위한 fetch get method
    useEffect(() => {
        const getComment = async () => {
            const response = await fetch(
                `${API_URL}/ourToday/checkPostComment/${postId}`,
            );
            const dayComments = await response.json();
            return dayComments;
        };
        getComment().then((dayComments) => {
            setComments(dayComments);
            return getCommentLength(dayComments.length);
        });
    }, [showWindow, ourTodayCommentUpdate]);

    return (
        <S.commentUnorderedList>
            {comments &&
                comments.map((replyComment, i) => (
                    <Comment
                        key={i}
                        replyComment={replyComment}
                        showWindow={showWindow}
                        setOurTodayCommentUpdate={setOurTodayCommentUpdate}
                        ourTodayCommentUpdate={ourTodayCommentUpdate}
                        handleCommentModal={handleCommentModal}
                    />
                ))}
            <S.gap></S.gap>
        </S.commentUnorderedList>
    );
};

export default CommentContainer;
