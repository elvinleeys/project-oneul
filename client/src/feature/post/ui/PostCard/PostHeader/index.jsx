import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../../../modal/model/modalSlice";
import Avatar from "../../../../../shared/ui/Avatar";

const PostHeader = ({ profileImg, nickname, isMine, postId, content }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <PostHeaderContainer>
            <AuthorWrapper>
                <div>
                    <Avatar src={profileImg} alt="profile-img" size={2.25} />
                </div>
                <Nickname>{nickname}</Nickname>
            </AuthorWrapper>
            {isMine ? (
                <UpdateBtnWrapper>
                    <UpdateBtn
                        onClick={() => {
                            navigate(`/post/edit/${postId}`, {
                                state: {
                                    content,
                                },
                            });
                        }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="pen" />
                    </UpdateBtn>
                    <UpdateBtn
                        onClick={() =>
                            dispatch(
                                openModal({
                                    type: "deletePost",
                                    targetId: postId,
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
    border-radius: 0;
    box-shadow: none;
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
