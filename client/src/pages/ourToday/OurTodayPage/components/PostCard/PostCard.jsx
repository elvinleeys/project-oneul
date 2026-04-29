import React from "react";
import styled from "styled-components";
import PostHeader from "./PostHeader";
import { PostContent } from "./PostContent";
import PostAction from "./PostAction";

const PostCard = ({ post }) => {
    const logo = "/logo192.png";
    const nickname = "박한영";
    const isMine = true;
    const reactions = [
        { type: "heart", count: 10, reacted: true },
        { type: "like", count: 3, reacted: false },
        { type: "smile", count: 5, reacted: false },
        { type: "sad", count: 1, reacted: false },
        { type: "angry", count: 0, reacted: false },
    ];

    return (
        <PostContainer>
            <PostHeader
                profileImg={logo}
                nickname={nickname}
                isMine={isMine}
                post={post}
            />
            <PostContent>안녕하세요</PostContent>
            <PostAction postId={post.id} reactions={reactions} />
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
