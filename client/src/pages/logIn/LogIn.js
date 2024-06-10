import React from "react";
import S from "./style";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
// import OneulInput from "../../components/input/OneulInput";
import Input from "../../components/input/style";
import OneulButton from "../../components/button/OneulButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const LogIn = () => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isSubmitted, errors },
    } = useForm({ mode: "onSubmit" });

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return (
        <S.Background>
            <S.Wrapper>
                <S.LogoWrapper>
                    <Link to={"/logIn"}>
                        <img src={process.env.PUBLIC_URL + "global/images/logo.png"} />
                    </Link>
                </S.LogoWrapper>
                <S.LoginForm
                    onSubmit={
                        handleSubmit(async (data) => {
                            console.log(data);
                        })
                        // handleSubmit(async (data) => {
                        //     try {
                        //         const response = await fetch("http://localhost:8000/api/login", {
                        //             method: "POST",
                        //             headers: {
                        //                 "Content-Type": "application/json",
                        //             },
                        //             body: JSON.stringify(data),
                        //         });

                        //         if (!response.ok) {
                        //             const result = await response.json();
                        //             throw new Error(result.message || "Login failed");
                        //         }

                        //         const result = await response.json();

                        //         // store에 로그인 데이터 업데이트
                        //         dispatch(loginSuccess(result.user));

                        //         // 메인 페이지로 이동
                        //         navigate("/");
                        //     } catch (error) {
                        //         console.error("Error during login:", error);
                        //         setError("apiError", {
                        //             type: "manual",
                        //             message: "이메일과 비밀번호가 일치하지 않습니다.",
                        //         });
                        //         dispatch(loginFailure(error.message));
                        //     }
                        // })
                    }
                >
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
                            variant={"active"}
                            size={"default"}
                        />
                        <S.ConfirmMessageWrapper>
                            {errors?.email?.type === "pattern" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon icon={faCircleXmark} className="icon" />
                                    이메일 양식에 맞게 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                            {errors?.email?.type === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon icon={faCircleXmark} className="icon" />
                                    이메일을 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                        </S.ConfirmMessageWrapper>
                    </S.LoginLabel>
                    <S.LoginLabel htmlFor="password">
                        <p>비밀번호</p>
                        <Input {...register("password", { required: true })} variant={"active"} size={"default"} type="password" />
                        <S.ConfirmMessageWrapper>
                            {errors?.password?.type === "required" && (
                                <S.ConfirmMessage>
                                    <FontAwesomeIcon icon={faCircleXmark} className="icon" />
                                    비밀번호 입력해주세요.
                                </S.ConfirmMessage>
                            )}
                        </S.ConfirmMessageWrapper>
                    </S.LoginLabel>
                    <OneulButton variant={"skyblue"} border={"default"} size={"large"} color={"white"} disabled={isSubmitting}>
                        로그인
                    </OneulButton>
                </S.LoginForm>
                <S.ToSignUp>
                    <Link to={"/signUp"}>
                        <OneulButton variant={"indigo"} border={"default"} size={"large"} color={"white"}>
                            회원가입
                        </OneulButton>
                    </Link>
                </S.ToSignUp>
            </S.Wrapper>
        </S.Background>
    );
};

export default LogIn;
