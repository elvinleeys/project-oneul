import React from "react";
import styled from "styled-components";
import PostHeader from "./PostHeader";
import { PostContent } from "./PostContent";
import PostAction from "./PostAction";
import { API_URL } from "../../../../shared/api/apiSlice";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
    const currentUser = useSelector((state) => state.login.currentUser);
    const currentUserEmail = currentUser?.email;
    const profileImg = `${API_URL}/${post.userProfileImg}`;
    const isMine = currentUserEmail === post.userEmail;
    const reactionTypes = ["heart", "like", "smile", "sad", "angry"];

    const reactions = reactionTypes.map((type) => ({
        type,
        count: post?.[type]?.length ?? 0,
        reacted: post?.[type]?.includes(currentUserEmail),
    }));

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

export default PostCard;

const PostContainer = styled.div`
    width: 20rem;
    min-height: 20rem;
    background-color: #ffffff;
    border-radius: 1.25rem;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
`;
