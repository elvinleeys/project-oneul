import React, { useEffect, useRef, useState } from "react";
import S from "./style";
import { Link, useNavigate } from "react-router-dom";
import OneulInput from "../../components/input/OneulInput";
import useInput from "../../hooks/useInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { API_URL } from "../../shared/api/apiSlice";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchInput = () => {
    const navigate = useNavigate();
    // 검색버튼 눌렀을 시 검색 인풋 활성화
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchResults, setSearchResults] = useState({
        myMindResults: [],
        ourtodayResults: [],
    });

    // useInput hook 사용
    const [searchValue, setSearchValue, handleSearchChange] = useInput("");
    const searchRef = useRef(null);

    const currentUser = useSelector((state) => state.login.currentUser);
    const [profileImg, setProfileImg] = useState("");

    const toggleSearch = () => {
        setIsSearchActive(!isSearchActive);
    };

    const handleSearchSubmit = async () => {
        navigate(`/search?value=${searchValue}`);

        // try {
        //     const token = localStorage.getItem("token");
        //     console.log(searchValue);
        //     const response = await fetch(`http://localhost:8000/search?value=${searchValue}`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${token}`,
        //         },
        //     });
        //     const data = await response.json();
        //     console.log(data);
        //     setSearchResults(data);

        //     navigate(`/search?value=${searchValue}`);
        // } catch (error) {
        //     console.error("Failed to search", error);
        // }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearchSubmit();
        }
    };

    useEffect(() => {
        const fetchUserProfileImage = async () => {
            if (currentUser && currentUser.email) {
                try {
                    const response = await fetch(
                        `${API_URL}/user/getProfile/${currentUser.email}`,
                    );
                    const data = await response.json();
                    setProfileImg(data.profileImg);
                } catch (error) {
                    console.error("Failed to fetch user profile image", error);
                }
            }
        };
        fetchUserProfileImage();
    }, [currentUser.email]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setIsSearchActive(false);
                setSearchValue("");
            }
        };

        if (isSearchActive) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchActive, setSearchValue]);
    return (
        <S.Header ref={searchRef}>
            <S.HeaderContainer className={isSearchActive ? "active" : ""}>
                <S.ProfileContainer>
                    <S.ThumbnailWrapper>
                        <Link to={"/myPage"}>
                            <img src={profileImg} alt="profile-img" />
                        </Link>
                    </S.ThumbnailWrapper>
                </S.ProfileContainer>
                <S.WelcomeMessage
                    className={isSearchActive ? "display-none" : ""}
                >
                    {currentUser.nickname}님, 반가워요!
                </S.WelcomeMessage>
                <OneulInput
                    $variant="active"
                    $size="default"
                    className={isSearchActive ? "" : "display-none"}
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
                <S.SearchButtonWrapper
                    className={isSearchActive ? "active" : ""}
                    onClick={isSearchActive ? handleSearchSubmit : toggleSearch}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </S.SearchButtonWrapper>
            </S.HeaderContainer>
        </S.Header>
    );
};

export default SearchInput;
