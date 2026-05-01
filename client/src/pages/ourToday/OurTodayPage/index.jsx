import React, { useEffect } from "react";
import styled from "styled-components";
import TabMenu from "../../../feature/post/ui/TabMenu/TabMenu";
import PostCard from "../../../feature/post/ui/PostCard/PostCard";
import CommentBS from "../../../feature/comment/ui/CommentBS";
import DeleteConfirmModal from "../../../feature/modal/ui/DeleteConfirmModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../feature/post/model/postSlice";

const OurToday = () => {
    const dispatch = useDispatch();
    const { tab, posts } = useSelector((s) => s.post);
    const { currentUser } = useSelector((s) => s.login);

    useEffect(() => {
        dispatch(fetchPosts({ type: tab, email: currentUser.email }));
    }, [tab]);

    return (
        <>
            <TabMenu />
            <PostList>
                {posts.map((post) => (
                    <li key={post._id}>
                        <PostCard post={post} />
                    </li>
                ))}
            </PostList>
            <DeleteConfirmModal />
            <CommentBS />
        </>
    );
};

export default OurToday;

const PostList = styled.ul`
    list-style-type: none;
    padding: 1.4375rem 1.25rem 4.375rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
`;
