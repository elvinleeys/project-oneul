import React, { useEffect, useState } from "react";
import EmptyPostAlarm from "./EmptyPostAlarm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../../shared/api/apiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PostCard from "../../feature/post/ui/PostCard/PostCard";
import CommentBS from "../../feature/comment/ui/CommentBS";

const SearchPage = () => {
    const [searchPosts, setSearchPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("value") || "";

    useEffect(() => {
        if (!keyword) return;

        const getPosts = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(
                    `${API_URL}/search?value=${keyword}`,
                );

                const data = await response.json();

                setSearchPosts(data);
            } catch (error) {
                console.error("Failed to fetch search results:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getPosts();
    }, [keyword]);

    if (isLoading) return <div>로딩중...</div>;

    return (
        <PageWrapper>
            {/* 이전으로 버튼 */}
            <BackButton onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} /> 이전으로
            </BackButton>

            {/* 검색 결과 목록 */}
            {searchPosts?.length === 0 ? (
                <EmptyPostAlarm />
            ) : (
                <>
                    <PostList>
                        {searchPosts?.map((post) => (
                            <li key={post._id}>
                                {/* keyword를 PostCard에 전달 */}
                                <PostCard post={post} keyword={keyword} />
                            </li>
                        ))}
                    </PostList>
                    <CommentBS />
                </>
            )}
        </PageWrapper>
    );
};

export default SearchPage;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

// 되돌아가기 버튼
const BackButton = styled.button`
    height: auto;
    background: transparent;
    border: none;
    color: #142146;
    font-size: 0.875rem;
    font-weight: bold;
    padding: 1.25rem 0.875rem;
    cursor: pointer;
    box-shadow: none;
`;

const PostList = styled.ul`
    list-style-type: none;
    padding: 0 1.25rem 4.375rem;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
`;
