import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { openSheet } from "../../../comment/model/commentUISlice";

const CommentBtn = ({ postId, count, email }) => {
    const dispatch = useDispatch();
    const handleOpenComment = () => {
        dispatch(openSheet({ postId, userEmail: email }));
    };

    return (
        <Comment onClick={handleOpenComment}>
            <FontAwesomeIcon icon={faMessage} className="message" />
            <span>{count}</span>
        </Comment>
    );
};

export default CommentBtn;

const Comment = styled.button`
    height: auto;
    display: flex;
    align-items: center;
    gap: 0.3125rem;
    border: none;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
    font-size: 1.125rem;
    cursor: pointer;

    span {
        font-size: 0.625rem;
    }

    & .message path {
        color: #bec1c5;
    }
`;
