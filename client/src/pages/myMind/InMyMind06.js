import React, { useEffect } from "react";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button/style";
import { useNavigate } from "react-router-dom";
import TitleStep from "./TitleStep";
import { FormContext } from "./context/FormContext";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { API_URL } from "../../shared/api/apiSlice";

const InMyMind06 = ({ index }) => {
    const currentUser = useSelector((state) => state.login.currentUser);
    const navigate = useNavigate();

    const today = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
    };
    const createdAt = `${today.year}-${today.month}-${today.date}`;

    const { state, actions } = useContext(FormContext);
    const [value, setValue] = useState(state.formData[index] || "");
    const [lastData, setLastData] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const onChangeValue = (e) => {
        setValue(e.target.value);
        setLastData(true);
    };

    const handleReset = () => {
        actions.resetFormData();
    };

    useEffect(() => {
        actions.updateFormData(index, value);
    }, [lastData]);

    const handleSubmit = async () => {
        actions.updateFormData(index, value);

        let formData = state.formData;

        if (formData.every((data) => data && data.trim() !== "")) {
            //MyMind 추가하기
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${API_URL}/myMind/post`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        userId: currentUser,
                        userEmail: currentUser.email,
                        createdAt: createdAt,
                        questions: formData,
                    }),
                });

                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.message || "myMindPost failed");
                }
            } catch (error) {
                console.error("error in fetch:", error);
            }
            // console.log("데이터 저장 성공")
            navigate("/");
            handleReset();
        } else {
            const emptyIndex = actions.findEmptyFieldIndex();
            if (emptyIndex !== -1) {
                setAlertMessage(`${emptyIndex + 1}번 질문에 답변을 해주세요!`);
                return;
            }
        }
    };

    return (
        <>
            <S.Wrapper>
                <TitleStep />

                <S.QuestionWrapper>
                    <FontAwesomeIcon
                        icon={faCloudMoon}
                        className="cloudMoonIcon"
                    />
                    <p>지금 마음이 어때~?</p>
                </S.QuestionWrapper>

                <S.TextAreaWrapper>
                    <textarea
                        id="lastTextarea"
                        value={value}
                        onChange={onChangeValue}
                        placeholder="나의 감정을 살펴보니까 무슨 마음이 들어? "
                    ></textarea>
                </S.TextAreaWrapper>

                {alertMessage && (
                    <S.AlertWrapper>
                        <p>{alertMessage}</p>
                    </S.AlertWrapper>
                )}

                <S.SaveButtonWrapper>
                    <Button
                        id="goToSave"
                        onClick={handleSubmit}
                        size={"large"}
                        border={"hoverIndigo"}
                        variant={"indigo"}
                        color={"white"}
                    >
                        제출
                    </Button>
                </S.SaveButtonWrapper>
            </S.Wrapper>
        </>
    );
};

export default InMyMind06;
