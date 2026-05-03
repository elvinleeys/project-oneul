import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirmModal from "../../modal/ui/DeleteConfirmModal";
import BottomSheet from "../../../shared/ui/BottomSheet";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useGetCommentsQuery } from "../api/commentApi";
import { closeSheet } from "../model/commentUISlice";

const CommentBS = () => {
    const dispatch = useDispatch();
    const { postId, userEmail, isOpen } = useSelector(
        (state) => state.commentUI,
    );

    const { data } = useGetCommentsQuery(
        {
            postId: postId,
            userEmail: userEmail,
        },
        {
            skip: !postId,
        },
    );

    // 삭제 관리
    // const [confirmId, setConfirmId] = useState(null); // 삭제 확인 대상 id
    // const handleDeleteRequest = (id) => setConfirmId(id);
    // const handleDeleteCancel = () => setConfirmId(null);
    // const handleDeleteConfirm = () => {
    //     dispatch(deleteComment(confirmId));
    //     setConfirmId(null);
    // };

    return (
        <>
            <BottomSheet isOpen={isOpen} onClose={() => dispatch(closeSheet())}>
                <Header>
                    <Title>
                        댓글 <span>{data?.commentCount}</span>
                    </Title>
                </Header>
                <CommentInput />

                <Divider />

                <CommentList comments={data?.comments} />
            </BottomSheet>
            <DeleteConfirmModal />
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
