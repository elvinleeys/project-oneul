import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faUserPen } from "@fortawesome/free-solid-svg-icons";
import S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogout } from "../../feature/login/logInSlice";
import { API_URL } from "../../shared/api/apiSlice";

const MyPageMain = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogin = useSelector((state) => state.login.isLogin);
    const currentUser = useSelector((state) => state.login.currentUser);

    const [nickname, setNickname] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null);
    const [profileImg, setProfileImg] = useState("");
    const [calendarData, setCalendarData] = useState([]);
    const [number1, setNumber1] = useState(0);

    const logoutApi = async () => {
        try {
            const response = await fetch(`${API_URL}/user/logout`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("로그아웃 실패");
            }

            clearSession();
            console.log("로그아웃 성공");
            // 세션 관련 정보를 클리어하는 함수 호출
        } catch (error) {
            console.error("로그아웃 오류:", error);
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
        if (currentUser) {
            fetchUserProfileImage();
            setNickname(currentUser.nickname);
            setStatusMessage(currentUser.statusMessage);
        }
    }, [currentUser]);

    useEffect(() => {
        //마음일지 데이터 가져오기
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_URL}/myMind/getCalendar`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("데이터를 불러오는 데 실패했습니다.");
                }
                const datas = await response.json();
                // console.log(datas);
                // setCalendarData(datas);
                // console.log(calendarData);
                // console.log(datas.length);
                // return datas.length;
                setNumber1(datas.length);
            } catch (error) {
                console.error("데이터를 불러오는 중 에러 발생:", error);
            }
        };
        fetchData();
        // setNumber1(fetchData());
    }, [currentUser]);

    console.log(number1);

    const clearSession = () => {
        // 쿠키 클리어
        document.cookie =
            "connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // 기타 로컬 스토리지 등의 클리어 로직 추가 가능
    };

    const handleLogout = async () => {
        try {
            await logoutApi();
            dispatch(setUserLogout(null, false));
            navigate("/logIn"); // 로그인 페이지로 리디렉션
        } catch (error) {
            console.error("Failed to handle logout:", error.message);
        }
    };

    return (
        <>
            <S.MypageNav>
                <Link to={"/myPage/edit"}>
                    <FontAwesomeIcon icon={faUserPen} />
                </Link>
            </S.MypageNav>
            <S.ProfileContaier>
                <S.ProfilePictureWrapper>
                    <div className="pictureBox">
                        <img src={profileImg} style={{ width: 100 }} />
                    </div>
                </S.ProfilePictureWrapper>
                <S.ProfileNameWrapper>
                    <h3>{nickname}</h3>
                </S.ProfileNameWrapper>
                <S.ProfileStatusWrapper>
                    <p>{statusMessage}</p>
                </S.ProfileStatusWrapper>
                <S.ProfileContentsWrapper>
                    <div className="totalMyminBox">
                        <p>누적된 나의 마음</p>
                        <h3>{number1}일</h3>
                    </div>
                    <div className="border">
                        <div></div>
                    </div>
                    <div className="sharedMytodayBox">
                        <p>공유된 나의 마음</p>
                        <Link to={"/myMind"}>
                            <h3>1개</h3>
                        </Link>
                    </div>
                </S.ProfileContentsWrapper>
            </S.ProfileContaier>
            <S.ServiceContainer>
                <S.ServiceWrapper>
                    <Link to={"/myPage/termsOfUse"}>
                        <p>서비스 이용약관</p>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                </S.ServiceWrapper>
                <S.ServiceWrapper>
                    <Link to={"/myPage/privacyPolicy"}>
                        <p>개인정보 처리 방침</p>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                </S.ServiceWrapper>
                <S.ServiceWrapper>
                    <button onClick={handleLogout}>
                        <p>로그아웃</p>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </S.ServiceWrapper>
                <S.ServiceWrapper>
                    <Link to={"/myPage/secession"}>
                        <p className="secession">회원탈퇴</p>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Link>
                </S.ServiceWrapper>
            </S.ServiceContainer>
        </>
    );
};

export default MyPageMain;
