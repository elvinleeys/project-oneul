import React, { useEffect, useState } from "react";
import S from "./style";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/style";
import OneulButton from "../../components/button/OneulButton";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
    updateSignUpData,
    resetSignUpData,
} from "../../feature/signup/signUpSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../shared/api/apiSlice";

const SignUpStep1 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signUpData = useSelector((state) => state.signup);

    const [email, setEmail, handleEmailChange] = useInput(
        signUpData.email || "",
    );
    const [password, setPassword, handlePasswordChange] = useInput(
        signUpData.password || "",
    );
    const [passwordCheck, setPasswordCheck, handlePasswordCheckChange] =
        useInput("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordCheckError, setPasswordCheckError] = useState("");

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

    useEffect(() => {
        console.log("Initial signUpData:", signUpData);
    }, [signUpData]);

    // 이메일 중복체크
    const checkEmailDuplicate = async (email) => {
        try {
            const response = await fetch(`${API_URL}/user/checkEmail`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            return result.duplicate;
        } catch (error) {
            console.error("Error checking email:", error);
            return false;
        }
    };

    // 이메일 형식에 맞지 않으면 에러 메세지 띄우기
    const validateEmail = async () => {
        if (!email.match(emailRegex)) {
            setEmailError("pattern");
            return false;
        }
        if (email === "") {
            setEmailError("required");
            return false;
        }
        const isDuplicate = await checkEmailDuplicate(email);
        if (isDuplicate) {
            setEmailError("duplicate");
            return false;
        }
        setEmailError("");
        return true;
    };

    // 비밀번호 입력 시 passwordRegex에 맞게 입력했는지 검사, 기준 충족하지 못할 시 에러메세지 띄우기
    const validatePassword = () => {
        if (!password.match(passwordRegex)) {
            setPasswordError("pattern");
            return false;
        }
        if (password === "") {
            setPasswordError("required");
            return false;
        }
        setPasswordError("");
        return true;
    };

    // 비밀변호 === 비밀번호 확인 체크, 같지 않을때 에러메세지 띄우기
    const validatePasswordCheck = () => {
        if (password !== passwordCheck) {
            setPasswordCheckError("mismatch");
            return false;
        }
        if (passwordCheck === "") {
            setPasswordCheckError("required");
            return false;
        }
        setPasswordCheckError("");
        return true;
    };

    const handleOnClickNext = async () => {
        // 모든 조건 통과시, 이메일과 비밀번호를 redux의 store에 저장, step2로 이동
        const isEmailValid = await validateEmail();
        const isPasswordValid = validatePassword();
        const isPasswordCheckValid = validatePasswordCheck();

        if (isEmailValid && isPasswordValid && isPasswordCheckValid) {
            dispatch(updateSignUpData({ email, password }));
            // console.log({ email, password });
            navigate("/signUp/2");
        }
    };

    const handleOnClickLogin = () => {
        // 로고 클릭시 redux의 store에 저장한 모든 내용 초기화, 그리고 /login 이동
        dispatch(resetSignUpData());
        console.log(signUpData);
        navigate("/logIn");
    };

    const handleOnClickBack = () => {
        dispatch(updateSignUpData({ email: "", password: "" }));
        navigate("/logIn");
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
                    <S.Label htmlFor="email">
                        <p>이메일</p>
                        <Input
                            variant={"active"}
                            size={"default"}
                            value={email}
                            placeholder="이메일을 입력해주세요"
                            onChange={handleEmailChange}
                            onBlur={validateEmail}
                        />
                        <S.ConfirmMessageWrapper>
                            {emailError === "pattern" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    이메일 양식에 맞게 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                            {emailError === "duplicate" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    이메일이 이미 사용 중입니다.
                                </S.ConfirmMessage>
                            )}
                            {emailError === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    이메일을 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                        </S.ConfirmMessageWrapper>
                    </S.Label>
                    <S.Label htmlFor="password">
                        <p>비밀번호</p>
                        <Input
                            variant={"active"}
                            size={"default"}
                            type="password"
                            value={password}
                            placeholder="비밀번호를 입력해주세요"
                            onChange={handlePasswordChange}
                            onBlur={validatePassword}
                        />
                        <S.ConfirmMessageWrapper>
                            {passwordError === "pattern" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    최소 8자, 하나의 숫자와 특수문자가
                                    필요합니다.
                                </S.ConfirmMessage>
                            )}
                            {passwordError === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    비밀번호를 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                        </S.ConfirmMessageWrapper>
                    </S.Label>
                    <S.Label htmlFor="password-check">
                        <p>비밀번호 확인</p>
                        <Input
                            variant={"active"}
                            size={"default"}
                            type="password"
                            value={passwordCheck}
                            placeholder="비밀번호를 다시 입력해주세요"
                            onChange={handlePasswordCheckChange}
                            onBlur={validatePasswordCheck}
                        />
                        <S.ConfirmMessageWrapper>
                            {passwordCheckError === "mismatch" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    비밀번호가 일치하지 않습니다.
                                </S.ConfirmMessage>
                            )}
                            {passwordCheckError === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    비밀번호 확인을 입력해주세요.
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

export default SignUpStep1;
