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

const SignUpNickname = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signUpData = useSelector((state) => state.signup);

    const [nickname, setNickname, handleNicknameChange] = useInput(
        signUpData.nickname || "",
    );
    const [nicknameError, setNicknameError] = useState("");

    useEffect(() => {
        console.log("SignUpStep3 signUpData:", signUpData);
    }, [signUpData]);

    // 닉네임 중복체크
    const checkNicknameDuplicate = async (nickname) => {
        try {
            const response = await fetch(`${API_URL}/user/checkNickname`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nickname }),
            });
            const result = await response.json();
            return result.duplicate;
        } catch (error) {
            console.error("Error checking nickname:", error);
            return false;
        }
    };

    const validateNickname = async () => {
        if (nickname === "") {
            setNicknameError("required");
            return false;
        }
        // 닉네임 중복시 에러메세지 추가
        const isDuplicate = await checkNicknameDuplicate(nickname);
        if (isDuplicate) {
            setNicknameError("duplicate");
            return false;
        }
        setNicknameError("");
        return true;
    };

    // 모든 조건 통과 시, 이름과 전화번호를 redux의 store에 저장, step3로 이동
    const handleOnClickNext = async () => {
        const isNicknameValid = await validateNickname();

        if (isNicknameValid) {
            dispatch(updateSignUpData({ nickname }));
            navigate("/signUp/4");
        }
    };

    // 로고 클릭 시 store 초기화
    const handleOnClickLogin = () => {
        dispatch(resetSignUpData());
        navigate("/logIn");
    };

    // 뒤로가기 버튼 클릭 시 store의 닉네임을 빈 문자열로 설정하고 이전 단계로 이동
    const handleOnClickBack = () => {
        dispatch(updateSignUpData({ nickname: "" }));
        navigate("/signUp/2");
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
                    <S.Label htmlFor="nickname">
                        <p>닉네임</p>
                        <Input
                            variant={"active"}
                            size={"default"}
                            value={nickname}
                            placeholder="닉네임을 입력해주세요"
                            onChange={handleNicknameChange}
                            onBlur={validateNickname}
                        />
                        <S.ConfirmMessageWrapper>
                            {nicknameError === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    닉네임을 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                            {nicknameError === "duplicate" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    중복된 닉네임입니다.
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

export default SignUpNickname;
