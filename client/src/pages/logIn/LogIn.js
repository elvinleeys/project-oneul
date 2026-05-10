import React, { useEffect } from "react";
import S from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserStatus } from "../../feature/login/logInSlice";
import Input from "../../components/input/style";
import OneulButton from "../../components/button/OneulButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "../../shared/api/apiSlice";

const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.login.currentUser);
    const userStatus = useSelector((state) => state.login.isLogin);

    // 로그인이 되어있을 시 메인페이지로 이동
    useEffect(() => {
        console.log(userStatus);
        if (userStatus) {
            navigate("/");
        }
    }, [userStatus, navigate]);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
        setError,
    } = useForm({ mode: "onSubmit" });

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const onSubmit = async (data) => {
        try {
            // const response = await fetch("http://localhost:8000/user/login", {
            const response = await fetch(`${API_URL}/user/passportLogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });
            console.log(response, "response data");
            console.log(response.ok);

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Login failed");
            }

            const result = await response.json();
            console.log(result);
            console.log(result.user);

            let { token, user } = result;
            console.log(token, user);
            // store에 로그인 데이터 업데이트
            dispatch(setUser(result.user));
            dispatch(setUserStatus(true));
            localStorage.setItem("token", token);
            // 메인 페이지로 이동
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Error during login:", error);
            setError("email", {
                type: "mismatch",
                message: "이메일 또는 비밀번호가 일치하지 않습니다.",
            });
            setError("password", {
                type: "mismatch",
                message: "이메일 또는 비밀번호가 일치하지 않습니다.",
            });
        }
    };

    return (
        <S.Background>
            <S.Wrapper>
                <S.LogoWrapper>
                    <Link to={"/logIn"}>
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                "global/images/logo.png"
                            }
                            alt="logo"
                        />
                    </Link>
                </S.LogoWrapper>
                <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
                    <S.LoginLabel htmlFor="email">
                        <p>이메일</p>
                        {/* OneulInput쓰면 OneulInput에서 forwardRef를 써야해서 */}
                        {/* 쌤 코드처럼 스타일만 import */}
                        <Input
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: emailRegex,
                                },
                            })}
                            $variant="active"
                            $size="default"
                        />
                        <S.ConfirmMessageWrapper>
                            {errors?.email?.type === "pattern" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    이메일 양식에 맞게 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                            {errors?.email?.type === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    이메일을 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                            {errors?.email?.type === "mismatch" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    이메일 또는 비밀번호가 일치하지 않습니다.
                                </S.ConfirmMessage>
                            )}
                        </S.ConfirmMessageWrapper>
                    </S.LoginLabel>
                    <S.LoginLabel htmlFor="password">
                        <p>비밀번호</p>
                        <Input
                            {...register("password", { required: true })}
                            $variant="active"
                            $size="default"
                            type="password"
                        />
                        <S.ConfirmMessageWrapper>
                            {errors?.password?.type === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    비밀번호 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                            {errors?.password?.type === "mismatch" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        className="icon"
                                    />
                                    이메일 또는 비밀번호가 일치하지 않습니다.
                                </S.ConfirmMessage>
                            )}
                        </S.ConfirmMessageWrapper>
                    </S.LoginLabel>
                    <OneulButton
                        $variant="skyblue"
                        $border="default"
                        $size="large"
                        $color="white"
                        disabled={isSubmitting}
                    >
                        로그인
                    </OneulButton>
                </S.LoginForm>
                <S.ToSignUp>
                    <Link to={"/signUp/1"}>
                        <OneulButton
                            $variant="indigo"
                            $border="default"
                            $size="large"
                            $color="white"
                        >
                            회원가입
                        </OneulButton>
                    </Link>
                </S.ToSignUp>
            </S.Wrapper>
        </S.Background>
    );
};

export default LogIn;
