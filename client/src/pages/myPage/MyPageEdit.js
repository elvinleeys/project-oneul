import React, { useState, useRef, useEffect } from "react";
import S from "./style";
import { Link } from "react-router-dom";
import OneulInput from "../../components/input/OneulInput";
import OneulButton from "../../components/button/OneulButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../shared/api/apiSlice";

const MyPageEdit = () => {
    const dispatch = useDispatch();

    const userPhoto = useSelector(
        (state) => state.login.currentUser.profileImg,
    );
    const userEmail = useSelector((state) => state.login.currentUser.email);
    const userPassword = useSelector(
        (state) => state.login.currentUser.password,
    );
    const userName = useSelector((state) => state.login.currentUser.name);
    const userMobile = useSelector((state) => state.login.currentUser.mobile);
    const userNickname = useSelector(
        (state) => state.login.currentUser.nickname,
    );
    const userStatus = useSelector(
        (state) => state.login.currentUser.statusMessage,
    );

    const currentUser = useSelector((state) => state.login.currentUser);

    const [profileImg, setProfileImg] = useState("");

    useEffect(() => {
        const fetchUserProfileImage = async () => {
            if (currentUser && currentUser.email) {
                try {
                    const response = await fetch(
                        `${API_URL}/user/getProfile/${currentUser.email}`,
                    );
                    const data = await response.json();
                    setProfileImg(data.profileImg);
                    console.log(data);
                } catch (error) {
                    console.error("Failed to fetch user profile image", error);
                }
            }
        };
        fetchUserProfileImage();
    }, [currentUser.email]);

    return (
        <S.Form>
            <S.PageTitle>
                <h2>프로필 변경</h2>
            </S.PageTitle>
            <S.ProfilePictureWrapper>
                <div className="pictureBox">
                    <img
                        src={profileImg}
                        alt="userPhoto"
                        style={{ width: 100 }}
                    />
                </div>
            </S.ProfilePictureWrapper>
            <S.InputContainer>
                <S.InputWrapper>
                    <p>이메일을 변경해주세요</p>
                    <OneulInput
                        name="email"
                        id="email"
                        value={userEmail}
                        readOnly
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <p>이름을 변경해주세요</p>
                    <OneulInput
                        name="name"
                        id="name"
                        value={userName}
                        readOnly
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <p>전화번호을 변경해주세요</p>
                    <OneulInput
                        name="phone"
                        id="phone"
                        value={userMobile}
                        readOnly
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <p>닉네임을 변경해주세요</p>
                    <OneulInput
                        name="nickname"
                        id="nickname"
                        value={userNickname}
                        readOnly
                    />
                </S.InputWrapper>
                <S.InputWrapper>
                    <p>상태메세지을 변경해주세요</p>
                    <OneulInput
                        name="statuMessage"
                        value={userStatus}
                        id="statuMessage"
                        readOnly
                    />
                </S.InputWrapper>
            </S.InputContainer>
            <S.buttonWrapper>
                <Link to={"/myPage/modify"}>
                    <OneulButton
                        variant="indigo"
                        color="white"
                        size="large"
                        border="default"
                    >
                        수정하기
                    </OneulButton>
                </Link>
            </S.buttonWrapper>
        </S.Form>
    );
};

export default MyPageEdit;
