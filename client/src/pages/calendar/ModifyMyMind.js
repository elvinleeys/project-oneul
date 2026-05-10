import React, { useEffect, useState } from "react";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/button/style";
import { useSelector } from "react-redux";
import { API_URL } from "../../shared/api/apiSlice";

const ModifyMyMind = () => {
    const currentUser = useSelector((state) => state.login.currentUser);
    const [datas, setDatas] = useState([]);
    const [modifiedDatas, setModifiedDatas] = useState([]);
    const [searchParams] = useSearchParams();
    const date = searchParams.get("date");
    const navigate = useNavigate();

    useEffect(() => {
        const getDatas = async () => {
            //마음일지 가져오기
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `${API_URL}/myMind/getMyMind?date=${date}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (!response.ok) {
                    throw new Error("데이터를 가져오는 데 실패했습니다.");
                }
                const data = await response.json();
                setDatas(data);
                setModifiedDatas(data);
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };
        if (date) {
            getDatas();
        }
    }, [date]);

    const handleInputChange = (index, value) => {
        const updatedDatas = [...modifiedDatas];
        updatedDatas[index] = value;
        setModifiedDatas(updatedDatas);
    };

    const handleUpdateDatas = async () => {
        //마음일지 수정하기
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `${API_URL}/myMind/update?date=${date}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(modifiedDatas),
                },
            );
            if (!response.ok) {
                throw new Error("데이터 업데이트에 실패했습니다.");
            }
            console.log("데이터 업데이트에 성공했습니다.");
            navigateToCheckMyMind();
        } catch (error) {
            console.error("에러 발생:", error);
            alert("데이터 업데이트 중 오류가 발생했습니다.");
        }
    };

    const navigateToCheckMyMind = () => {
        navigate(`/calendar/checkMyMind?date=${date}`);
    };

    return (
        <>
            <S.PageContainer>
                <FontAwesomeIcon
                    onClick={navigateToCheckMyMind}
                    icon={faCircleXmark}
                    className="faCircleXmark"
                />
                <S.TitleWrapper>
                    나의 지난 마음보기
                    <div id="date">{date}</div>
                </S.TitleWrapper>

                <S.QuestionsWrapper>
                    {/* 1번 질문 */}
                    <S.QuestionWrapper>
                        <FontAwesomeIcon
                            icon={faCloudMoon}
                            className="cloudMoonIcon"
                        />
                        <p>
                            오늘 {currentUser.nickname}(이)는 어떤 감정들을
                            느꼈어?
                        </p>
                    </S.QuestionWrapper>
                    <S.TextAreaWrapper>
                        <textarea
                            value={modifiedDatas[0]}
                            onChange={(e) =>
                                handleInputChange(0, e.target.value)
                            }
                        ></textarea>
                    </S.TextAreaWrapper>

                    {/* 2번 질문 */}
                    <S.QuestionWrapper>
                        <FontAwesomeIcon
                            icon={faCloudMoon}
                            className="cloudMoonIcon"
                        />
                        <p>어떤 상황 때문에 이 감정들을 느꼈어?</p>
                    </S.QuestionWrapper>
                    <S.TextAreaWrapper>
                        <textarea
                            value={modifiedDatas[1]}
                            onChange={(e) =>
                                handleInputChange(1, e.target.value)
                            }
                        ></textarea>
                    </S.TextAreaWrapper>

                    {/* 3번 질문 */}
                    <S.QuestionWrapper>
                        <FontAwesomeIcon
                            icon={faCloudMoon}
                            className="cloudMoonIcon"
                        />
                        <p>
                            그럼 {currentUser.nickname}(이)는 그 상황에서 무엇을
                            바랐어?
                        </p>
                    </S.QuestionWrapper>
                    <S.TextAreaWrapper>
                        <textarea
                            value={modifiedDatas[2]}
                            onChange={(e) =>
                                handleInputChange(2, e.target.value)
                            }
                        ></textarea>
                    </S.TextAreaWrapper>

                    {/* 4번 질문 */}
                    <S.QuestionWrapper>
                        <FontAwesomeIcon
                            icon={faCloudMoon}
                            className="cloudMoonIcon"
                        />
                        <p>
                            그랬구나..! {currentUser.nickname}(이)는 어떤 말이
                            듣고 싶어?
                        </p>
                    </S.QuestionWrapper>
                    <S.TextAreaWrapper>
                        <textarea
                            value={modifiedDatas[3]}
                            onChange={(e) =>
                                handleInputChange(3, e.target.value)
                            }
                        ></textarea>
                    </S.TextAreaWrapper>

                    {/* 5번 질문 */}
                    <S.QuestionWrapper>
                        <FontAwesomeIcon
                            icon={faCloudMoon}
                            className="cloudMoonIcon"
                        />
                        <p>
                            {currentUser.nickname}(이)는 자신에게 어떤 말을
                            해주고 싶어?
                        </p>
                    </S.QuestionWrapper>
                    <S.TextAreaWrapper>
                        <textarea
                            value={modifiedDatas[4]}
                            onChange={(e) =>
                                handleInputChange(4, e.target.value)
                            }
                        ></textarea>
                    </S.TextAreaWrapper>

                    {/* 6번 질문 */}
                    <S.QuestionWrapper>
                        <FontAwesomeIcon
                            icon={faCloudMoon}
                            className="cloudMoonIcon"
                        />
                        <p>지금 마음이 어때~?</p>
                    </S.QuestionWrapper>
                    <S.TextAreaWrapper>
                        <textarea
                            value={modifiedDatas[5]}
                            onChange={(e) =>
                                handleInputChange(5, e.target.value)
                            }
                        ></textarea>
                    </S.TextAreaWrapper>

                    <S.ButtonWrapper>
                        <Button
                            onClick={handleUpdateDatas}
                            className="completedModifyButton"
                            size={"large"}
                            border={"hoverIndigo"}
                            variant={"indigo"}
                            color={"white"}
                        >
                            수정 완료
                        </Button>
                    </S.ButtonWrapper>
                </S.QuestionsWrapper>
            </S.PageContainer>
        </>
    );
};

export default ModifyMyMind;
