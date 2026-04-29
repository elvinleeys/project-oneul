import styled from "styled-components";
import Button from "../../../shared/Button";
import Dialog from "../../../shared/Dialog";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../model/modalSlice";
import { deleteComment } from "../../comment/model/commentSlice";

export default function DeleteConfirmModal({ onConfirm }) {
    const { isOpen, type, targetId } = useSelector((s) => s.modal);
    const dispatch = useDispatch();
    const onCancel = () => dispatch(closeModal());
    const target = type === "deleteComment" ? "댓글" : "게시글";

    const handleConfirm = () => {
        if (type === "deleteComment") {
            // dispatch(deleteComment(targetId));
        }
        if (type === "deletePost") {
            // dispatch(deletePost(targetId));
        }
        dispatch(closeModal());
    };

    return (
        <Dialog isOpen={isOpen} onCancel={onCancel}>
            <Icon>🗑️</Icon>
            <Title>{target}을 삭제할까요?</Title>
            <Desc>삭제된 {target}은 복구할 수 없어요.</Desc>
            <BtnRow>
                <Button $variant="neutral" $full onClick={onCancel}>
                    취소
                </Button>
                <Button $variant="danger" $full onClick={handleConfirm}>
                    삭제하기
                </Button>
            </BtnRow>
        </Dialog>
    );
}

const Icon = styled.div`
    font-size: 38px;
    margin-bottom: 0.875rem;
`;

const Title = styled.p`
    font-size: 1rem;
    font-weight: 600;
    color: #222;
    margin: 0 0 0.5rem;
`;

const Desc = styled.p`
    font-size: 0.8125rem;
    color: #aaa;
    line-height: 1.6;
    margin: 0 0 1.5rem;
`;

const BtnRow = styled.div`
    display: flex;
    gap: 0.625rem;
    width: 100%;
`;
