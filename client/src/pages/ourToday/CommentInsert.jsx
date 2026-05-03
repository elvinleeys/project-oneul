import React, { useEffect, useState } from "react";
import S from "./style";
import useInput from "../../hooks/useInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { API_URL } from "../../shared/api/apiSlice";

const CommentInsert = ({
    post,
    showWindow,
    setOurTodayCommentUpdate,
    ourTodayCommentUpdate,
    commentLength,
}) => {
    // 댓글 입력창의 입력 input을 관리하기 위한 훅함수
    const [value, setValue, onChangeValue] = useInput("");
    // 댓글 입력창의 프로필 이미지를 관리하기 위한 상태관리
    const [todayProfileImg, setTodayProfileImg] = useState("");
    // 전역변수 currentUser
    const currentUser = useSelector((state) => state.login.currentUser);

    // 댓글 입력시 enter key로도 입력 가능하게 하기 위한 함수
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            createComment();
        }
    };

    // 댓글 생성을 위한 fetch POST method
    const createComment = async () => {
        console.log(value);
        try {
            const response = await fetch(`${API_URL}/ourToday/writeComment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: post._id,
                    commentText: value,
                    commentUser: currentUser.email,
                    commentProfileImg: todayProfileImg,
                    commentUserNickName: currentUser.nickname,
                }),
            });
            if (response.ok) {
                const result = await response.json();
                setValue(""); // 입력값 초기화
                setOurTodayCommentUpdate(!ourTodayCommentUpdate);
                console.log(result);
            } else {
                console.error("Failed to submit post");
            }
        } catch (error) {
            console.error(
                "An error occurred while submitting the post:",
                error,
            );
        }
    };

    // 댓글 입력창의 프로필 이미지를 불러오기 위한 fetch 요청
    useEffect(() => {
        const fetchUserProfileImage = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/user/getProfile/${currentUser.email}`,
                );
                const data = await response.json();
                setTodayProfileImg(data.profileImg);
            } catch (error) {
                console.error("Failed to fetch user profile image", error);
            }
        };
        fetchUserProfileImage();
    }, [showWindow, currentUser.email]);

    return (
        <S.commentInsertContainer>
            <S.commentCountWrapper>
                <span>댓글</span>
                <span>{commentLength}</span>
            </S.commentCountWrapper>
            <S.commentInputContainer>
                <S.commentThumbnailWrapper>
                    <img
                        src={
                            todayProfileImg ||
                            `${process.env.PUBLIC_URL}/global/images/default.png`
                        }
                        alt="profile-img"
                    />
                </S.commentThumbnailWrapper>
                <S.commentInputWrapper>
                    <S.commentInput
                        type="text"
                        placeholder="다른사람과 소통해볼까요?"
                        value={value}
                        onChange={onChangeValue}
                        onKeyDown={handleKeyPress}
                    />
                    <S.commentForwardButton onClick={createComment}>
                        <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="paperPlane"
                        />
                    </S.commentForwardButton>
                </S.commentInputWrapper>
            </S.commentInputContainer>
        </S.commentInsertContainer>
    );
};

export default CommentInsert;
