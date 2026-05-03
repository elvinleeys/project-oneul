import React, { useMemo } from "react";
import styled from "styled-components";
import PostHeader from "./PostHeader";
import { PostContent } from "./PostContent";
import PostAction from "./PostAction";
import { API_URL } from "../../../../shared/api/apiSlice";
import { useSelector } from "react-redux";

const reactionTypes = ["heart", "like", "smile", "sad", "angry"];

const PostCard = ({ post }) => {
    const currentUser = useSelector((state) => state.login.currentUser);
    const currentUserEmail = currentUser?.email;
    const profileImg = `${API_URL}/${post.userProfileImg}`;
    const isMine = currentUserEmail === post.userEmail;

    const reactions = useMemo(() => {
        return reactionTypes.map((type) => ({
            type,
            count: post?.[type]?.length ?? 0,
            reacted: post?.[type]?.includes(currentUserEmail),
        }));
    }, [post, currentUserEmail]);

    return (
        <PostContainer>
            <PostHeader
                profileImg={profileImg}
                nickname={post.userNickname}
                isMine={isMine}
                postId={post._id}
                content={post.content}
            />
            <PostContent>{post.content}</PostContent>
            <PostAction
                postId={post._id}
                reactions={reactions}
                commentCnt={post.commentCount}
                email={currentUserEmail}
            />
        </PostContainer>
    );
};

export default React.memo(PostCard, (prev, next) => {
    const prevPost = prev.post;
    const nextPost = next.post;

    return (
        prevPost._id === nextPost._id &&
        prevPost.content === nextPost.content &&
        prevPost.commentCount === nextPost.commentCount &&
        reactionTypes.every(
            (type) => prevPost[type]?.length === nextPost[type]?.length,
        )
    );
});

const PostContainer = styled.div`
    width: 20rem;
    min-height: 20rem;
    background-color: #ffffff;
    border-radius: 1.25rem;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
`;
