import React, { useEffect, useRef, useState } from "react";
import {
    faFaceAngry as regularAngry,
    faFaceSadTear as regularSadTear,
    faFaceSmile as regularSmile,
    faHeart as regularHeart,
    faThumbsUp as regularThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import {
    faFaceAngry as solidAngry,
    faFaceSadTear as solidSadTear,
    faFaceSmile as solidSmile,
    faHeart as solidHeart,
    faMessage,
    faThumbsUp as solidThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import S from "./style";
import CommentInsert from "./CommentInsert";
import { useSelector } from "react-redux";
import CommentContainer from "./CommentContainer";
import { API_URL } from "../../shared/api/apiSlice";

// {comments, isCommentUpdate, setIsCommentUpdate}
const Reaction = ({
    post,
    tabActive,
    setTabActive,
    setOurTodayUpdate,
    ourTodayUpdate,
}) => {
    const postId = post._id;
    const currentUser = useSelector((state) => state.login.currentUser);
    const commentModalBackground = useRef();
    // 댓글의 update 상태를 관리할 상태관리
    const [ourTodayCommentUpdate, setOurTodayCommentUpdate] = useState(false);

    // 댓글 버튼 클릭시 창을 보이게 하기 위한 상태변화 준비
    const [showWindow, setShowWindow] = useState(false);
    // 댓글 삭제시 댓글의 id를 받아올 상태관리
    const [commentIdToDelete, setCommentIdToDelete] = useState("");
    // 댓글의 삭제 모달창을 관리할 상태관리
    const [commentModalStatus, setCommentModalStatus] = useState(false);
    // 지금 요소를 드래그하고 있는지에 대한 상태관리
    const [isDragging, setIsDragging] = useState(false);
    // 댓글 bottom sheet에 표시할 댓글의 수를 받아올 상태관리
    const [commentLength, setCommentLength] = useState();
    // 게시글에 표시할 댓글의 수를 받아올 상태관리
    const [commentCount, setCommentCount] = useState();
    // isDragging을 반대로 바꿔주어 드래그가 가능해지도록 설정
    const onDragStart = (e) => {
        setIsDragging(!isDragging);
        setOurTodayCommentUpdate(!ourTodayCommentUpdate);
    };
    // showWindow의 값을 반대로 바꾸어 상태를 변화시킴
    // (궁극적으로 창을 보이게 하거나 안보이게 이벤트를 걸어줄 예정)
    const activateCommentWindow = () => {
        setShowWindow(!showWindow);
    };

    // CommentContainer로부터 댓글의 수를 받아올 함수
    const getCommentLength = (length) => {
        return setCommentLength(length);
    };

    //     // 💡PanInfo 객체란?
    // 다음 값들에 대한 x, y값을 가진 객체를 의미합니다.

    // point: 디바이스나 페이지에 대한 좌표값
    // delta: 마지막 이벤트로부터 멀어진 거리(움직인 거리)
    // offset: 기존 팬 이벤트로부터의 오프셋
    // velocity: 포인터의 현재 속도

    // threshold
    // 디폴트로, 제스처 핸들러는 이벤트가 발생하면 바로 유발되지만, 사용자 액션이 의도적임을 확실하게 해야 할 때가 있다. 그럴 때, threshold를 쓰면 된다.
    // threshold는 핸들러가 실행되기 전에 제스처 움직임이 이동해야 하는 최소 변위이다.

    // 예제
    // threshold를 100으로 설정하고 증가될 때마다 보이도록 했다.
    // 사각형을 드래그하면, 사각형이 축을 따라 이동할 때까지, 몇 픽셀이 남았는지를 보여주는 ghost 사각형을 보여줄 수 있다.

    // 하트 reaction 클릭시 클릭한 유저의 이메일 데이터를 받을 fetch PUT 요청
    const handleUpdateHeartReaction = async () => {
        console.log(post.heart);
        if (post.heart.includes(currentUser.email)) {
            const response = await fetch(
                `${API_URL}/ourToday/minusPostHeartReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        } else {
            const response = await fetch(
                `${API_URL}/ourToday/plusPostHeartReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        }
    };

    // Like 리액션 클릭시 클릭한 유저의 이메일을 추가 또는 삭제할 fetch요청
    const handleUpdateLikeReaction = async () => {
        if (post.like.includes(currentUser.email)) {
            const response = await fetch(
                `${API_URL}/ourToday/minusPostLikeReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        } else {
            const response = await fetch(
                `${API_URL}/ourToday/plusPostLikeReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        }
    };

    // 웃는 표정 reaction 클릭시 유저의 이메일 정보를 받아 처리할 fetch요청
    const handleUpdateSmileReaction = async () => {
        if (post.smile.includes(currentUser.email)) {
            const response = await fetch(
                `${API_URL}/ourToday/minusPostSmileReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        } else {
            const response = await fetch(
                `${API_URL}/ourToday/plusPostSmileReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        }
    };

    // 슬픔 reaction 클릭시 유저의 이메일 정보를 받아 처리할 fetch 요청
    const handleUpdateSadReaction = async () => {
        if (post.sad.includes(currentUser.email)) {
            const response = await fetch(
                `${API_URL}/ourToday/minusPostSadReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        } else {
            const response = await fetch(
                `${API_URL}/ourToday/plusPostSadReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        }
    };

    // 화남 reaction 클릭시 유저의 이메일 정보를 받아 처리할 fetch 요청
    const handleUpdateAngryReaction = async () => {
        if (post.angry.includes(currentUser.email)) {
            const response = await fetch(
                `${API_URL}/ourToday/minusPostAngryReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        } else {
            const response = await fetch(
                `${API_URL}/ourToday/plusPostAngryReaction`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: postId,
                        userEmail: currentUser.email,
                    }),
                },
            );
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
            } else {
                console.error("Failed to update post");
            }
        }
    };

    // 댓글의 삭제 버튼 클릭시 각 댓글의 id를 받아오고, 모달창을 여는 함수
    const handleCommentModal = (id) => {
        setCommentIdToDelete(id);
        setCommentModalStatus(!commentModalStatus);
        console.log("commentModalStatus:", !commentModalStatus);
    };

    // 댓글의 삭제 모달창의 배경을 클릭시 모달창을 닫을 함수
    const handleCommentBackgroundModal = (e) => {
        if (e.target === commentModalBackground.current) {
            setCommentModalStatus(!commentModalStatus);
        }
    };

    // 게시글에 표시할 댓글의 수를 받아오는 fetch 요청
    useEffect(() => {
        const getCommentCount = async () => {
            // console.log(postId)
            try {
                const response = await fetch(
                    `${API_URL}/ourToday/checkPostComment/${postId}`,
                );
                const comments = await response.json();
                // console.log(comment.length)
                setCommentCount(comments.length);
            } catch (error) {
                console.error("Failed to fetch comment length", error);
            }
        };
        getCommentCount();
    }, [postId, tabActive, ourTodayCommentUpdate]);

    // 각 댓글의 삭제 모달 확인 버튼 클릭시 삭제를 요청할 fetch
    const handleDeleteComment = async () => {
        console.log(commentIdToDelete);
        try {
            const response = await fetch(`${API_URL}/ourToday/deleteComment`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: commentIdToDelete,
                }),
            });
            if (response.ok) {
                setCommentModalStatus(!commentModalStatus);
                setOurTodayCommentUpdate(!ourTodayCommentUpdate);
                console.log("정상적으로 삭제가 완료되었습니다.");
            } else {
                console.error("Failed to delete post");
            }
        } catch (error) {
            console.error("An error occurred while deleting the post:", error);
        }
    };

    return (
        <>
            <S.reactionWrapper>
                <S.commentIconContainer>
                    <S.commentIconWrapper onClick={activateCommentWindow}>
                        <FontAwesomeIcon icon={faMessage} className="comment" />
                        <S.commentCount>{commentCount}</S.commentCount>
                    </S.commentIconWrapper>
                </S.commentIconContainer>
                <S.emotionContainer>
                    <S.emotionWrapper>
                        <label>
                            <S.emotionList onClick={handleUpdateHeartReaction}>
                                <FontAwesomeIcon
                                    icon={
                                        post.heart.includes(currentUser.email)
                                            ? solidHeart
                                            : regularHeart
                                    }
                                    className="heart"
                                />
                                <S.reactionCountWrapper>
                                    {post.heart.length}
                                </S.reactionCountWrapper>
                            </S.emotionList>
                        </label>
                        <label>
                            <S.emotionList onClick={handleUpdateLikeReaction}>
                                <FontAwesomeIcon
                                    icon={
                                        post.like.includes(currentUser.email)
                                            ? solidThumbsUp
                                            : regularThumbsUp
                                    }
                                    className="thumbsUp"
                                />
                                <S.reactionCountWrapper>
                                    {post.like.length}
                                </S.reactionCountWrapper>
                            </S.emotionList>
                        </label>
                        <label>
                            <S.emotionList onClick={handleUpdateSmileReaction}>
                                <FontAwesomeIcon
                                    icon={
                                        post.smile.includes(currentUser.email)
                                            ? solidSmile
                                            : regularSmile
                                    }
                                    className="smile"
                                />
                                <S.reactionCountWrapper>
                                    {post.smile.length}
                                </S.reactionCountWrapper>
                            </S.emotionList>
                        </label>
                        <label>
                            <S.emotionList onClick={handleUpdateSadReaction}>
                                <FontAwesomeIcon
                                    icon={
                                        post.sad.includes(currentUser.email)
                                            ? solidSadTear
                                            : regularSadTear
                                    }
                                    className="sad"
                                />
                                <S.reactionCountWrapper>
                                    {post.sad.length}
                                </S.reactionCountWrapper>
                            </S.emotionList>
                        </label>
                        <label>
                            <S.emotionList onClick={handleUpdateAngryReaction}>
                                <FontAwesomeIcon
                                    icon={
                                        post.angry.includes(currentUser.email)
                                            ? solidAngry
                                            : regularAngry
                                    }
                                    className="angry"
                                />
                                <S.reactionCountWrapper>
                                    {post.angry.length}
                                </S.reactionCountWrapper>
                            </S.emotionList>
                        </label>
                    </S.emotionWrapper>
                </S.emotionContainer>
            </S.reactionWrapper>
            {/* handleWindowY()함수를 반환함으로써 함수의 실행결과가 S.commentWindow의 props로 반환된다.
                    onMouseDown은 마우스를 누를때 이벤트를 설정해주는 것으로 onDragStart 함수를 실행해주어 drag가 가능해지도록 설정 */}
            {showWindow && (
                <S.commentContentContainer>
                    <S.commentWindow
                        drag="y"
                        onMouseDown={onDragStart}
                        dragConstraints={{ top: 0, bottom: 0 }}
                        animate={{ y: -45 }}
                        exit={{ y: 45 }}
                        transition={{
                            type: "spring",
                        }}
                        onDragEnd={(info) => {
                            // y가 음수이면 위로, 양수이면 아래로

                            const offsetThreshold = 30;

                            const isOverOffsetThreshold =
                                Math.abs(info.offsetY) > offsetThreshold;

                            if (!isOverOffsetThreshold) return;

                            activateCommentWindow();
                        }}
                    >
                        <CommentInsert
                            post={post}
                            showWindow={showWindow}
                            setOurTodayCommentUpdate={setOurTodayCommentUpdate}
                            ourTodayCommentUpdate={ourTodayCommentUpdate}
                            getCommentLength={getCommentLength}
                            commentLength={commentLength}
                        />
                        <S.commentContainer>
                            <CommentContainer
                                post={post}
                                showWindow={showWindow}
                                setOurTodayCommentUpdate={
                                    setOurTodayCommentUpdate
                                }
                                ourTodayCommentUpdate={ourTodayCommentUpdate}
                                getCommentLength={getCommentLength}
                                handleCommentModal={handleCommentModal}
                            />
                        </S.commentContainer>
                    </S.commentWindow>
                </S.commentContentContainer>
            )}
            {commentModalStatus && (
                <S.modalContainer
                    ref={commentModalBackground}
                    onClick={handleCommentBackgroundModal}
                >
                    <S.modalWrapper>
                        <S.modalTitle>삭제</S.modalTitle>
                        <S.modalDescriptionWrapper>
                            <S.modalDescription>
                                내용을 정말로 삭제하시겠습니까?
                                <br />
                                삭제 시 복구할 수 없습니다.
                            </S.modalDescription>
                        </S.modalDescriptionWrapper>
                        <S.modalButtonContainer>
                            <S.modalButtonWrapper>
                                <S.modalCancelButton
                                    onClick={handleCommentModal}
                                >
                                    취소
                                </S.modalCancelButton>
                            </S.modalButtonWrapper>
                            <S.modalButtonWrapper>
                                <S.modalDeleteButton
                                    onClick={handleDeleteComment}
                                >
                                    삭제
                                </S.modalDeleteButton>
                            </S.modalButtonWrapper>
                        </S.modalButtonContainer>
                    </S.modalWrapper>
                </S.modalContainer>
            )}
        </>
    );
};

export default Reaction;
