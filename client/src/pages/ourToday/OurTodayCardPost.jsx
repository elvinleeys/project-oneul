import React, { useEffect, useRef, useState } from "react";
import S from "./style";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Reaction from "./Reaction";
import useTextarea from "../../hooks/useTextarea";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../shared/api/apiSlice";

const OurTodayCardPost = ({
    posts,
    post,
    tabActive,
    setTabActive,
    setOurTodayUpdate,
    ourTodayUpdate,
}) => {
    // 게시글의 수정상태를 관리할 상태관리
    const [isPostEdit, setIsPostEdit] = useState(false);
    // 게시글의 게시자의 프로필 이미지 정보를 담기 위한 상태관리
    const [todayProfileImg, setTodayProfileImg] = useState("");
    // 게시글의 삭제 모달창을 관리할 상태관리
    const [postModalStatus, setPostModalStatus] = useState(false);
    // 게시글의 내용이 담겨져 있는 textarea를 관리할 훅함수
    const [postValue, setPostValue, handlePostChange] = useTextarea();
    // 삭제 모달창의 배경에 대한 useRef
    const modalBackground = useRef();
    // currentUser 전역 변수
    const currentUser = useSelector((state) => state.login.currentUser);
    // post의 id를 담을 postId 변수 선언
    const postId = post._id;

    // 게시글의 수정상태를 관리할 함수
    const handleOpenPostEdit = (post) => {
        setIsPostEdit(!isPostEdit);
        setPostValue(post.content);
    };

    // 게시글의 수정상태를 취소할 함수
    const handlePostEdit = () => {
        setIsPostEdit(!isPostEdit);
    };

    // 게시글의 삭제 모달창의 열고 닫음을 관리할 함수
    const handleDeleteModal = () => {
        return setPostModalStatus(!postModalStatus);
    };

    // 삭제 모달창이 열려져있는 상태일 시 배경을 누르더라도
    // 모달창을 닫을 수 있게 관리할 함수
    const handleBackgroundModal = (e) => {
        if (e.target === modalBackground.current) {
            setPostModalStatus(!postModalStatus);
        }
    };

    // 게시글의 게시자의 프로필 이미지를 불러올 fetch 요청
    useEffect(() => {
        setTodayProfileImg("");
        const fetchUserProfileImage = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/user/getProfile/${post.userEmail}`,
                );
                const data = await response.json();
                setTodayProfileImg(data.profileImg);
            } catch (error) {
                console.error("Failed to fetch user profile image", error);
            }
        };
        fetchUserProfileImage();
    }, [post.userEmail, tabActive]);

    // 게시글의 수정을 위한 fetch PUT method
    const handleUpdatePost = async () => {
        // console.log(postValue)
        try {
            const response = await fetch(`${API_URL}/ourToday/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...post,
                    id: post._id,
                    content: postValue,
                }),
            });
            if (response.ok) {
                console.log("게시글이 정상적으로 수정되었습니다.");
                setOurTodayUpdate(!ourTodayUpdate);
                setIsPostEdit(false);
            } else {
                console.error("Failed to update post");
            }
        } catch (error) {
            console.error("An error occurred while updating the post:", error);
        }
    };

    const handleDeletePost = async () => {
        console.log(postId);
        try {
            const response = await fetch(`${API_URL}/ourToday/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _id: postId,
                }),
            });
            if (response.ok) {
                setOurTodayUpdate(!ourTodayUpdate);
                setPostModalStatus(!postModalStatus);
                console.log("정상적으로 삭제가 완료되었습니다.");
            } else {
                console.error("Failed to delete post");
            }
        } catch (error) {
            console.error("An error occurred while deleting the post:", error);
        }
    };

    return (
        <div>
            <li>
                <S.cardPostContainer>
                    <S.postProfileContainer>
                        <S.ThumbnailWrapper>
                            <img
                                src={
                                    todayProfileImg ||
                                    `${process.env.PUBLIC_URL}/global/images/default.png`
                                }
                                alt="profile-img"
                            />
                        </S.ThumbnailWrapper>
                        <S.userNameWrapper>
                            {post.userNickname}
                        </S.userNameWrapper>
                        {currentUser.email === post.userEmail ? (
                            <S.correctionButtonContainer>
                                {!isPostEdit ? (
                                    <>
                                        <S.correctionButtonWrapper>
                                            <S.correctionButton
                                                onClick={() => {
                                                    handleOpenPostEdit(post);
                                                }}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                    className="pen"
                                                />
                                            </S.correctionButton>
                                        </S.correctionButtonWrapper>
                                        <S.correctionButtonWrapper>
                                            <S.correctionButton
                                                onClick={handleDeleteModal}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrashCan}
                                                    className="trash"
                                                />
                                            </S.correctionButton>
                                        </S.correctionButtonWrapper>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </S.correctionButtonContainer>
                        ) : (
                            <></>
                        )}
                    </S.postProfileContainer>
                    <S.postContentContainer>
                        {isPostEdit ? (
                            <S.todayPostText
                                defaultValue={postValue}
                                onChange={handlePostChange}
                                autoFocus
                            ></S.todayPostText>
                        ) : (
                            <S.postContentWrapper>
                                {post.content}
                            </S.postContentWrapper>
                        )}
                    </S.postContentContainer>
                    {!isPostEdit ? (
                        <>
                            <S.reactionContainer>
                                <Reaction
                                    post={post}
                                    tabActive={tabActive}
                                    setTabActive={setTabActive}
                                    setOurTodayUpdate={setOurTodayUpdate}
                                    ourTodayUpdate={ourTodayUpdate}
                                />
                            </S.reactionContainer>
                        </>
                    ) : (
                        <S.updateButtonContainer>
                            <S.updateButtonWrapper>
                                <S.updateButton onClick={handleUpdatePost}>
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="check"
                                    />
                                </S.updateButton>
                            </S.updateButtonWrapper>
                            <S.updateButtonWrapper>
                                <S.cancelUpdateButton onClick={handlePostEdit}>
                                    <FontAwesomeIcon
                                        icon={faX}
                                        className="exit"
                                    />
                                </S.cancelUpdateButton>
                            </S.updateButtonWrapper>
                        </S.updateButtonContainer>
                    )}
                </S.cardPostContainer>
            </li>
            {postModalStatus && (
                <S.modalContainer
                    ref={modalBackground}
                    onClick={handleBackgroundModal}
                >
                    <S.modalWrapper>
                        <S.modalTitle>삭제</S.modalTitle>
                        <S.modalDescriptionWrapper>
                            <S.modalDescription>
                                게시물을 정말로 삭제하시겠습니까?
                                <br />
                                삭제 시 게시글과 관련 댓글이 사라지고
                                <br />
                                다시 복구할 수 없습니다.
                            </S.modalDescription>
                        </S.modalDescriptionWrapper>
                        <S.modalButtonContainer>
                            <S.modalButtonWrapper>
                                <S.modalCancelButton
                                    onClick={handleDeleteModal}
                                >
                                    취소
                                </S.modalCancelButton>
                            </S.modalButtonWrapper>
                            <S.modalButtonWrapper>
                                <S.modalDeleteButton onClick={handleDeletePost}>
                                    삭제
                                </S.modalDeleteButton>
                            </S.modalButtonWrapper>
                        </S.modalButtonContainer>
                    </S.modalWrapper>
                </S.modalContainer>
            )}
        </div>
    );
};

export default OurTodayCardPost;
