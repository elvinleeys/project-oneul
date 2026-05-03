import React, { useEffect, useState } from "react";
import S from "./style";
import EmptyPostAlarm from "./EmptyPostAlarm";
import SearchPost from "./SearchPost";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../shared/api/apiSlice";

const SearchPosts = () => {
    const [searchPosts, setSearchPosts] = useState([]);
    const [searchUpdate, setSearchUpdate] = useState(false);

    const location = useLocation();
    console.log(location);

    const searchValue = decodeURI(location.search.replace("?value=", ""));
    console.log(searchValue);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/search?value=${searchValue}`,
                );
                const data = await response.json();
                setSearchPosts(data);
                console.log(searchPosts);
            } catch (error) {
                console.error("Failed to fetch search results:", error);
            }
        };

        if (searchValue) {
            getPosts();
        }
    }, [searchValue, searchUpdate]);
    console.log(searchPosts);

    return (
        <ul>
            {searchPosts.length > 0 ? (
                searchPosts.map((searchPost, i) => (
                    <SearchPost
                        searchPost={searchPost}
                        key={i}
                        searchPosts={searchPosts}
                        searchUpdate={searchUpdate}
                        setSearchUpdate={setSearchUpdate}
                    />
                ))
            ) : (
                <EmptyPostAlarm searchValue={searchValue} />
            )}
            <S.gap></S.gap>
        </ul>
    );
};

export default SearchPosts;
