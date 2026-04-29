import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "../../../shared/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import { editComment } from "../model/commentSlice";
import { openModal } from "../../modal/model/modalSlice";
import CommentEdit from "./CommentEdit";

const CommentItem = ({ c }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState("");

    const handleEditStart = () => {
        setIsEditing((prev) => !prev);
        setEditText(c.text);
    };

    const handleEditSave = (id) => {
        if (!editText.trim()) return;
        dispatch(editComment({ id, text: editText.trim() }));
        setIsEditing((prev) => !prev);
        setEditText("");
    };

    const handleEditCancel = () => {
        setIsEditing((prev) => !prev);
        setEditText("");
    };

    return (
        <CommentRow>
            <Avatar />
            <CommentBody>
                <CommentMeta>
                    <AuthorWrap>
                        <AuthorName>{c.author}</AuthorName>
                        {c.isMine && <MeBadge>나</MeBadge>}
                    </AuthorWrap>
                    <TimeAndActions>
                        <Time>{c.time}</Time>
                        {c.isMine && (
                            <>
                                <IconBtn>
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        color="#aaa"
                                        onClick={handleEditStart}
                                    />
                                </IconBtn>
                                <IconBtn
                                    onClick={() =>
                                        dispatch(
                                            openModal({
                                                type: "deleteComment",
                                                targetId: c.id,
                                            }),
                                        )
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faTrashCan}
                                        color="#aaa"
                                    />
                                </IconBtn>
                            </>
                        )}
                    </TimeAndActions>
                </CommentMeta>
                {isEditing ? (
                    <CommentEdit
                        value={editText}
                        onChangeText={(text) => setEditText(text)} // e 없이 text만 받음
                        onSave={() => handleEditSave(c.id)}
                        onCancel={handleEditCancel}
                    />
                ) : (
                    <CommentText>{c.text}</CommentText>
                )}
            </CommentBody>
        </CommentRow>
    );
};

export default CommentItem;

const CommentRow = styled.div`
    display: flex;
    gap: 10px;
    align-items: flex-start;
`;

const CommentBody = styled.div`
    flex: 1;
`;

const CommentMeta = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3px;
`;

const AuthorWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const AuthorName = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: #222;
`;

const MeBadge = styled.span`
    font-size: 10px;
    background: #eef0ff;
    color: #5b5ea6;
    border-radius: 20px;
    padding: 2px 7px;
`;

const TimeAndActions = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Time = styled.span`
    font-size: 11px;
    color: #bbb;
`;

const IconBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    font-size: 0.8125rem;
`;

const CommentText = styled.p`
    font-size: 13px;
    color: #666;
    margin: 0 0 6px;
    line-height: 1.5;
`;
