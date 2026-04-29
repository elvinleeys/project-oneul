import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Avatar from "../../../shared/Avatar";
import styled from "styled-components";

const CommentInput = () => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        // dispatch(addComment(text.trim()));
        setText("");
    };

    return (
        <InputRow>
            <Avatar />
            <InputWrap>
                <StyledInput
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="따뜻한 댓글을 남겨보세요"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <SendBtn onClick={() => {}}>
                    <FontAwesomeIcon icon={faPaperPlane} color="#5B5EA6" />
                </SendBtn>
            </InputWrap>
        </InputRow>
    );
};

export default CommentInput;

const InputRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0 1rem 0.875rem;
`;

const InputWrap = styled.div`
    flex: 1;
    background: #f5f5f5;
    border-radius: 1.25rem;
    padding: 9px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StyledInput = styled.input`
    border: none;
    outline: none;
    background: transparent;
    flex: 1;
    font-size: 13px;
    color: #333;
    &::placeholder {
        color: #bbb;
    }
`;

const SendBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
`;
