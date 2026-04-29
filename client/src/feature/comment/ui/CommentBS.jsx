import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmModal from "../../modal/ui/DeleteConfirmModal";
import BottomSheet from "../../../shared/BottomSheet";
import { closeSheet, deleteComment } from "../model/commentSlice";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentBS = () => {
    const dispatch = useDispatch();
    const { isOpen, comments } = useSelector((s) => s.comment);

    // 삭제 관리
    const [confirmId, setConfirmId] = useState(null); // 삭제 확인 대상 id
    const handleDeleteRequest = (id) => setConfirmId(id);
    const handleDeleteCancel = () => setConfirmId(null);
    const handleDeleteConfirm = () => {
        dispatch(deleteComment(confirmId));
        setConfirmId(null);
    };

    return (
        <>
            <BottomSheet isOpen={isOpen} onClose={() => dispatch(closeSheet())}>
                <Header>
                    <Title>
                        댓글 <span>{0}</span>
                    </Title>
                </Header>
                <CommentInput />

                <Divider />

                <CommentList comments={comments} />
            </BottomSheet>
            <DeleteConfirmModal
                isOpen={!!confirmId}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default CommentBS;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem 1.125rem 0.75rem;
`;

const Title = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: #222;
    span {
        color: #5b5ea6;
    }
`;

// input
const Divider = styled.div`
    height: 0.5px;
    background: #ececec;
    margin: 0 1rem 0.875rem;
`;
