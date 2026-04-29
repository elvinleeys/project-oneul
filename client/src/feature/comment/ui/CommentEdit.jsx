import React from "react";
import styled from "styled-components";

const CommentEdit = ({ value, onChangeText, onSave, onCancel }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") onSave();
        if (e.key === "Escape") onCancel();
    };

    return (
        <EditWrap>
            <EditInput
                value={value}
                onChange={(e) => onChangeText(e.target.value)} // e.target.value 추출을 내부에서 처리
                onKeyDown={handleKeyDown}
                autoFocus
            />
            <EditActions>
                <CancelBtn onClick={onCancel}>취소</CancelBtn>
                <SaveBtn onClick={onSave}>저장</SaveBtn>
            </EditActions>
        </EditWrap>
    );
};

export default CommentEdit;

const EditWrap = styled.div`
    margin: 4px 0 6px;
`;

const EditInput = styled.textarea`
    width: 100%;
    box-sizing: border-box;
    border: 1.5px solid #5b5ea6;
    border-radius: 12px;
    padding: 8px 12px;
    font-size: 13px;
    line-height: 1.5;
    color: #333;
    resize: none;
    outline: none;
    background: #f9f8ff;
    min-height: 60px;
    font-family: inherit;
`;

const EditActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 6px;
`;

const CancelBtn = styled.button`
    font-size: 12px;
    color: #aaa;
    background: #f5f5f5;
    border: none;
    border-radius: 20px;
    padding: 5px 14px;
    cursor: pointer;
`;

const SaveBtn = styled.button`
    font-size: 12px;
    color: #fff;
    background: #5b5ea6;
    border: none;
    border-radius: 20px;
    padding: 5px 14px;
    cursor: pointer;
`;
