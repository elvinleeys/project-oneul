import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { startEdit } from "../../../../feature/post/model/postEditSlice";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../../feature/modal/model/modalSlice";

const PostHeader = ({ profileImg, nickname, isMine, post }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <PostHeaderContainer>
            <AuthorWrapper>
                <div>
                    <ProfileImg src={profileImg} alt="profile-img" />
                </div>
                <Nickname>{nickname}</Nickname>
            </AuthorWrapper>
            {isMine ? (
                <UpdateBtnWrapper>
                    <UpdateBtn
                        onClick={() => {
                            dispatch(
                                startEdit({
                                    id: post.id,
                                    content: post.content,
                                }),
                            );
                            navigate("/write");
                        }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="pen" />
                    </UpdateBtn>
                    <UpdateBtn
                        onClick={() =>
                            dispatch(
                                openModal({
                                    type: "deletePost",
                                    targetId: post.id,
                                }),
                            )
                        }
                    >
                        <FontAwesomeIcon icon={faTrashCan} className="trash" />
                    </UpdateBtn>
                </UpdateBtnWrapper>
            ) : null}
        </PostHeaderContainer>
    );
};

export default PostHeader;

const PostHeaderContainer = styled.div`
    padding: 1rem 1.25rem 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AuthorWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.875rem;
`;

const ProfileImg = styled.img`
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    object-fit: cover;
`;

const Nickname = styled.p`
    font-size: 0.875rem;
    font-weight: bold;
    color: #142146;
`;

const UpdateBtnWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const UpdateBtn = styled.button`
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-content: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    background: none;
    display: inline-block;
    padding: 0;
    font-size: 1rem;

    & .pen path {
        color: #142146;
    }
    & .pen:hover path {
        color: #5f81f7;
    }

    & .trash path {
        color: #142146;
    }
    & .trash:hover path {
        color: #ec6863;
    }
    & .check path {
        color: #142146;
    }
    & .exit path {
        color: #142146;
    }
`;
