import React, { useEffect, useState } from "react";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faPenToSquare,
    faTrashCan,
    faX,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { API_URL } from "../../shared/api/apiSlice";

const Comment = ({
    replyComment,
    showWindow,
    setOurTodayCommentUpdate,
    ourTodayCommentUpdate,
    handleCommentModal,
}) => {
    // 댓글의 프로필 이미지를 띄울 상태관리
    const [todayCommentProfileImg, setTodayCommentProfileImg] = useState("");
    // 댓글의 수정 상태 관리
    const [isCommentEdit, setIsCommentEdit] = useState(false);
    // 댓글의 입력 시간을 관리하기 위한 상태관리
    const [timeAgo, setTimeAgo] = useState("");
    // 댓글의 input태그에 대한 훅함수
    const [commentValue, setCommentValue, handleCommentChange] = useInput();
    // 댓글의 입력창에 프로필 이미지를 띄우기 위한 currentUser 전역변수
    const currentUser = useSelector((state) => state.login.currentUser);
    // 각 댓글의 comment id
    const commentId = replyComment._id;

    // 댓글의 수정 상태 open
    const handleOpenCommentEdit = (replyComment) => {
        setIsCommentEdit(!isCommentEdit);
        setCommentValue(replyComment.commentText);
    };
    // 댓글의 수정 상태 변화를 위한 함수
    const handleCommentEdit = () => {
        setIsCommentEdit(!isCommentEdit);
    };

    // 프로필 이미지를 띄우기 위한 fetch 요청
    useEffect(() => {
        const fetchUserProfileImage = async () => {
            try {
                const response = await fetch(
                    `${API_URL}user/getProfile/${replyComment.commentUser}`,
                );
                const data = await response.json();
                setTodayCommentProfileImg(data.profileImg);
            } catch (error) {
                console.error("Failed to fetch user profile image", error);
            }
        };
        fetchUserProfileImage();
    }, [showWindow, ourTodayCommentUpdate]);

    // 댓글의 수정 요청을 위한 fetch의 PUT Method
    const handleUpdateComment = async () => {
        // console.log(commentValue)
        try {
            const response = await fetch(`${API_URL}/ourToday/updateComment`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...replyComment,
                    id: replyComment._id,
                    commentText: commentValue,
                }),
            });
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayCommentUpdate(!ourTodayCommentUpdate);
                setIsCommentEdit(false);
            } else {
                console.error("Failed to update post");
            }
        } catch (error) {
            console.error("An error occurred while updating the post:", error);
        }
    };

    // 댓글의 입력 시간을 형식 변환하기 위한 함수 선언
    const updateTimeStamp = () => {
        // 경과한 시간 계산 (1초 = 1000)
        const timeElapsed = Math.floor(
            (new Date() - new Date(replyComment.createdAt)) / 1000,
        );

        if (timeElapsed < 60) {
            setTimeAgo(`방금 전`);
        } else if (timeElapsed < 60 * 60) {
            const minutes = Math.floor(timeElapsed / 60);
            setTimeAgo(`${minutes}분 전`);
        } else if (timeElapsed < 60 * 60 * 24) {
            const hours = Math.floor(timeElapsed / (60 * 60));
            setTimeAgo(`${hours}시간 전`);
        } else if (timeElapsed < 60 * 60 * 24 * 7) {
            const days = Math.floor(timeElapsed / (60 * 60 * 24));
            setTimeAgo(`${days}일 전`);
        } else {
            // 일주일 이상 지난 아이템에 대해서는 YYYY-MM-DD로 표기
            const date = new Date(replyComment.createdAt)
                .toISOString()
                .slice(0, 10);
            setTimeAgo(date);
        }
    };

    useEffect(() => {
        updateTimeStamp();
    }, [replyComment.createdAt]);

    return (
        <li>
            <S.commentUserInfoWrapper>
                <S.commentThumbnailWrapper>
                    <img
                        src={
                            todayCommentProfileImg ||
                            `${process.env.PUBLIC_URL}/global/images/default.png`
                        }
                        alt="profile-img"
                    />
                </S.commentThumbnailWrapper>
                <S.commentNameAndDate>
                    <S.commentUserName>
                        {replyComment.commentUserNickName}
                    </S.commentUserName>
                    <S.commentDate>{timeAgo}</S.commentDate>
                </S.commentNameAndDate>
                {currentUser.email === replyComment.commentUser ? (
                    <S.correctionButtonContainer>
                        {!isCommentEdit ? (
                            <>
                                <S.correctionButtonWrapper>
                                    <S.correctionButton
                                        onClick={() =>
                                            handleOpenCommentEdit(replyComment)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="pen"
                                        />
                                    </S.correctionButton>
                                </S.correctionButtonWrapper>
                                <S.correctionButtonWrapper>
                                    <S.correctionButton
                                        onClick={() =>
                                            handleCommentModal(commentId)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            className="trash"
                                        />
                                    </S.correctionButton>
                                </S.correctionButtonWrapper>
                            </>
                        ) : (
                            <>
                                <S.correctionButtonWrapper>
                                    <S.correctionButton
                                        onClick={handleUpdateComment}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="check"
                                        />
                                    </S.correctionButton>
                                </S.correctionButtonWrapper>
                                <S.correctionButtonWrapper>
                                    <S.correctionButton
                                        onClick={handleCommentEdit}
                                    >
                                        <FontAwesomeIcon
                                            icon={faX}
                                            className="exit"
                                        />
                                    </S.correctionButton>
                                </S.correctionButtonWrapper>
                            </>
                        )}
                    </S.correctionButtonContainer>
                ) : (
                    <></>
                )}
            </S.commentUserInfoWrapper>
            {isCommentEdit ? (
                <S.comment
                    type="text"
                    className="comment"
                    value={commentValue}
                    onChange={handleCommentChange}
                />
            ) : (
                <S.commentWrapper>{replyComment.commentText}</S.commentWrapper>
            )}
        </li>
    );
};

export default Comment;
