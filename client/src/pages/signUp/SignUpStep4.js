import React, { useEffect, useState } from "react";
import S from "./style";
import { Link, useNavigate } from "react-router-dom";
import OneulButton from "../../components/button/OneulButton";
import { useDispatch, useSelector } from "react-redux";
import { updateSignUpData, resetSignUpData } from "../../feature/signup/signUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const SignUpStep4 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signUpData = useSelector((state) => state.signup);
    const defaultProfileImg = `${process.env.PUBLIC_URL}/global/images/default.png`;
    const [profileImg, setProfileImg] = useState(
        signUpData.profileImg || defaultProfileImg,
    );

    useEffect(() => {
        console.log("SignUpStep4 signUpData:", signUpData);
        if (signUpData.profileImg) {
            setProfileImg(signUpData.profileImg);
        }
    }, [signUpData]);

    // 건너뛰기 클릭 시 store에 기본이미지로 profile 이미지 저장, SignUpStep5 이동
    const handleOnClickSkip = () => {
        dispatch(
            updateSignUpData({ profileImg: `images/profile/default.png` }),
        );
        navigate("/signUp/5");
    };

    // profile label 클릭 시 이미지를 올려서 S.ImgWrapper안의 기본 이미지를 올린 이미지로 변경하고, 화면에 유지하는 로직 (새로운 이미지를 올린 상태로 다시 눌렀을 때 또 새로운 이미지로 대체되도록 코드 구성)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // 파일을 올리지 않았을 때 초기화
            setProfileImg(defaultProfileImg);
        }
    };

    // 다음버튼 눌렀을 시 store에 profile 이미지 저장, SignUpStep5이동
    const handleOnClickNext = () => {
        dispatch(updateSignUpData({ profileImg }));
        navigate("/signUp/5");
    };

    const handleOnClickLogin = () => {
        dispatch(resetSignUpData());
        navigate("/logIn");
    };

    const handleOnClickBack = () => {
        dispatch(updateSignUpData({ profileImg: "" }));
        navigate("/signUp/3");
    };

    return (
        <S.Background>
            <S.Wrapper>
                <S.BackWrapper>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="icon"
                        onClick={handleOnClickBack}
                    />
                </S.BackWrapper>
                <S.LogoWrapper>
                    <Link to={"/logIn"} onClick={handleOnClickLogin}>
                        <img
                            src={`${process.env.PUBLIC_URL}/global/images/logo.png`}
                            alt="logo"
                        />
                    </Link>
                </S.LogoWrapper>
                <S.ContentContainer>
                    <S.LabelCentered htmlFor="profile-img">
                        <p>사람들에게 보일 내 얼굴을 올려보세요</p>
                        <label htmlFor="profile">
                            <S.ProfileWrapper>
                                <S.ProfileImgWrapper>
                                    {/* 이미지 올리지 않았을 시 기본이미지 */}
                                    <img
                                        src={
                                            profileImg ||
                                            `${process.env.PUBLIC_URL}/global/images/default.png`
                                        }
                                        alt="profile-img"
                                    />
                                </S.ProfileImgWrapper>
                                <FontAwesomeIcon
                                    icon={faCirclePlus}
                                    className="icon"
                                />
                            </S.ProfileWrapper>
                        </label>
                        <input
                            type="file"
                            id="profile"
                            style={{ display: "none" }}
                            accept=".jpg, .jpeg, .png, .svg"
                            onChange={handleImageChange}
                        />
                    </S.LabelCentered>
                </S.ContentContainer>
                <S.ButtonContainer>
                    {/* 이미지를 올렸을 시 건너뛰기버튼을 다음버튼으로 대체 */}
                    {profileImg === defaultProfileImg ? (
                        <OneulButton
                            variant={"indigo"}
                            border={"default"}
                            size={"large"}
                            color={"white"}
                            onClick={handleOnClickSkip}
                        >
                            건너뛰기
                        </OneulButton>
                    ) : (
                        <OneulButton
                            variant={"indigo"}
                            border={"default"}
                            size={"large"}
                            color={"white"}
                            onClick={handleOnClickNext}
                        >
                            다음
                        </OneulButton>
                    )}
                </S.ButtonContainer>
            </S.Wrapper>
        </S.Background>
    );
};

export default SignUpStep4;
