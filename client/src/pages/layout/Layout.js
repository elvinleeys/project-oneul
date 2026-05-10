import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeartCircleCheck,
    faCalendarDays,
    faHouse,
    faUsers,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import SearchInput from "./SearchInput";
import { useSelector } from "react-redux";

const Layout = () => {
    // useLocation을 써서 메인, 우리의오늘, 검색일때 화면에 header 표시
    const location = useLocation();
    const path = location.pathname;
    const showHeader =
        path === "/" ||
        path === "/ourToday" ||
        path === `/search` ||
        path === "/edit";

    const currentUser = useSelector((state) => state.login.currentUser);
    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);

    return (
        <S.Background>
            <S.Wrapper>
                {showHeader && <SearchInput />}
                <S.Main>
                    <Outlet />
                </S.Main>
                <S.Nav>
                    <NavLink to={"/myMind"}>
                        <S.NavWrap>
                            <FontAwesomeIcon
                                icon={faHeartCircleCheck}
                                className="icon"
                            />
                            <p>나의 마음보기</p>
                        </S.NavWrap>
                    </NavLink>
                    <NavLink to={"/calendar"}>
                        <S.NavWrap>
                            <FontAwesomeIcon
                                icon={faCalendarDays}
                                className="icon"
                            />
                            <p>캘린더</p>
                        </S.NavWrap>
                    </NavLink>
                    <NavLink to={"/"}>
                        <S.NavWrap>
                            <FontAwesomeIcon icon={faHouse} className="icon" />
                            <p>홈</p>
                        </S.NavWrap>
                    </NavLink>
                    <NavLink to={"/ourToday"}>
                        <S.NavWrap>
                            <FontAwesomeIcon icon={faUsers} className="icon" />
                            <p>우리의 오늘</p>
                        </S.NavWrap>
                    </NavLink>
                    <NavLink to={"/myPage"}>
                        <S.NavWrap>
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <p>마이페이지</p>
                        </S.NavWrap>
                    </NavLink>
                </S.Nav>
            </S.Wrapper>
        </S.Background>
    );
};

export default Layout;
