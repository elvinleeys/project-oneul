import React from "react";
import styled from "styled-components";
import CommentBtn from "../../CommentBtn";
import ReactionBtn from "../../../../reaction/ReactionBtn";

const PostAction = ({ postId, reactions, commentCnt, email }) => {
    return (
        <Container>
            <CommentBtn postId={postId} count={commentCnt} email={email} />
            <ReactionWrapper>
                {reactions.map((reaction) => (
                    <ReactionBtn
                        key={reaction.type}
                        postId={postId}
                        type={reaction.type}
                        count={reaction.count}
                        reacted={reaction.reacted}
                    />
                ))}
            </ReactionWrapper>
        </Container>
    );
};

export default PostAction;

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
