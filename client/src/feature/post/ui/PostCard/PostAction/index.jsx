import React from "react";
import styled from "styled-components";
import CommentBtn from "../../CommentBtn";
import ReactionBtn from "../../../../reaction/ReactionBtn";

const reactionTypes = ["heart", "like", "smile", "sad", "angry"];

const PostAction = ({ postId, reactions, commentCnt, email }) => {
    return (
        <Container>
            <CommentBtn postId={postId} count={commentCnt} email={email} />
            <ReactionWrapper>
                {reactionTypes.map((type) => (
                    <ReactionBtn
                        key={type}
                        postId={postId}
                        type={type}
                        count={reactions?.[type]?.count ?? 0}
                        reacted={reactions?.[type]?.reacted ?? false}
                    />
                ))}
            </ReactionWrapper>
        </Container>
    );
};

export default React.memo(PostAction);

const Container = styled.div`
    padding: 1rem 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ReactionWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.875rem;
`;
