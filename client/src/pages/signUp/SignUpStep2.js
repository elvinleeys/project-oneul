import React, { useEffect, useState } from "react";
import S from "./style";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/style";
import OneulButton from "../../components/button/OneulButton";
import { useDispatch, useSelector } from "react-redux";
import {
    updateSignUpData,
    resetSignUpData,
} from "../../feature/signup/signUpSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useInput from "../../hooks/useInput";
import { API_URL } from "../../api/Api";

const SignUpStep2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signUpData = useSelector((state) => state.signup);

    const [name, setName, handleNameChange] = useInput(signUpData.name || "");
    const [mobile, setMobile] = useInput(signUpData.mobile || "");
    const [nameError, setNameError] = useState("");
    const [mobileError, setMobileError] = useState("");

    // useEffect로 store 체크
    useEffect(() => {
        console.log("SignUpStep2 signUpData:", signUpData);
    }, [signUpData]);

    const validateName = () => {
        if (name === "") {
            setNameError("required");
            return false;
        }
        setNameError("");
        return true;
    };

    // 전화번호 중복체크
    const checkMobileDuplicate = async (mobile) => {
        try {
            const response = await fetch(`${API_URL}/user/checkMobile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mobile }),
            });
            const result = await response.json();
            return result.duplicate;
        } catch (error) {
            console.error("Error checking mobile:", error);
            return false;
        }
    };

    const validateMobile = async () => {
        const mobilePattern = /^010\d{8}$/;
        if (mobile === "") {
            setMobileError("required");
            return false;
        }
        if (!mobilePattern.test(mobile)) {
            setMobileError("invalid");
            return false;
        }
        // 입력한 mobile을 db조회 후 중복된 번호면 에러메세지 띄우기
        const isDuplicate = await checkMobileDuplicate(mobile);
        if (isDuplicate) {
            setMobileError("duplicate");
            return false;
        }
        setMobileError("");
        return true;
    };

    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 11) {
            setMobile(value);
        }
    };

    // 모든 조건 통과 시, 이름과 전화번호를 redux의 store에 저장, step3로 이동
    const handleOnClickNext = async () => {
        const isNameValid = validateName();
        const isMobileValid = await validateMobile();
        if (isNameValid && isMobileValid) {
            dispatch(updateSignUpData({ name, mobile }));
            navigate("/signUp/3");
        }
    };

    // 로고 클릭 시 store 초기화
    const handleOnClickLogin = () => {
        dispatch(resetSignUpData());
        navigate("/logIn");
    };

    // 뒤로가기 버튼 클릭 시 store의 이름과 전화번호를 빈 문자열로 설정하고 이전 단계로 이동
    const handleOnClickBack = () => {
        dispatch(updateSignUpData({ name: "", mobile: "" }));
        navigate("/signUp/1");
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
                    <S.Label htmlFor="name">
                        <p>이름</p>
                        <Input
                            variant={"active"}
                            size={"default"}
                            value={name}
                            placeholder="이름을 입력해주세요"
                            onChange={handleNameChange}
                            onBlur={validateName}
                        />
                        <S.ConfirmMessageWrapper>
                            {nameError === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    이름을 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                        </S.ConfirmMessageWrapper>
                    </S.Label>
                    <S.Label htmlFor="mobile">
                        <p>전화번호</p>
                        <Input
                            variant={"active"}
                            size={"default"}
                            type="tel"
                            value={mobile}
                            placeholder="전화번호를 입력해주세요"
                            onChange={handleMobileChange}
                            onBlur={validateMobile}
                        />
                        <S.ConfirmMessageWrapper>
                            {mobileError === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    전화번호를 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                            {mobileError === "invalid" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    올바른 전화번호를 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                            {mobileError === "duplicate" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    중복된 전화번호입니다.
                                </S.ConfirmMessage>
                            )}
                        </S.ConfirmMessageWrapper>
                    </S.Label>
                </S.ContentContainer>
                <S.ButtonContainer>
                    <OneulButton
                        variant={"indigo"}
                        border={"default"}
                        size={"large"}
                        color={"white"}
                        onClick={handleOnClickNext}
                    >
                        다음
                    </OneulButton>
                </S.ButtonContainer>
            </S.Wrapper>
        </S.Background>
    );
};

export default SignUpStep2;
