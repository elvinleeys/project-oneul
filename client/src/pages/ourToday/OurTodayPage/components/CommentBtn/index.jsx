import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { openSheet } from "../../../feature/comment/model/commentSlice";

const CommentBtn = ({ postId, count }) => {
    const dispatch = useDispatch();

    return (
        <Comment onClick={() => dispatch(openSheet())}>
            <FontAwesomeIcon icon={faMessage} color="#BEC1C5" />
            <span>{count}</span>
        </Comment>
    );
};

export default CommentBtn;

const Comment = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border: none;
    background-color: transparent;
    font-size: 1.125rem;
    cursor: pointer;

    span {
        font-size: 0.625rem;
    }
`;
