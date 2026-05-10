import React, { useEffect, useState } from "react";
import S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import Button from "../../components/button/style";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../shared/api/apiSlice";

const MyMindHome = () => {
    const [hasWrittenToday, setHasWrittenToday] = useState(false);
    const [showErrorContainer, setShowErrorContainer] = useState(false);

    const navigate = useNavigate();

    const today = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
    };
    const checkToday = `${today.year}-${today.month}-${today.date}`;

    useEffect(() => {
        const getTodayExistence = async () => {
            //오늘 날짜 마음일지 가져오기
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `${API_URL}/myMind/getTodayExistence?date=${checkToday}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const data = await response.json();
                if (data) {
                    setHasWrittenToday(true);
                    return;
                }
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };
        getTodayExistence();
    }, []);

    const handleButtonClick = () => {
        if (hasWrittenToday) {
            setShowErrorContainer(true);
        } else {
            navigate("/myMind/inMyMind01");
        }
    };

    return (
        <>
            <S.ImageWrapper>
                <S.TitleWrapper>
                    <p id="firstPage">나의 마음보기</p>
                </S.TitleWrapper>

                <S.text01>
                    나의 마음과 대화하면서 편안해지길 바라요
                    <FontAwesomeIcon
                        icon={faHeartCircleCheck}
                        className="faHeartCircleCheck"
                    />
                </S.text01>

                {showErrorContainer && (
                    <S.ErrorContainer>
                        <S.ErrorTitle>오늘의 마음일지 작성 완료</S.ErrorTitle>
                        <S.ErrorTexts>
                            <div>
                                작성된 마음일지는 캘린더에서 날짜를 클릭해 조회,
                                수정, 삭제할 수 있습니다.
                            </div>
                        </S.ErrorTexts>
                        <S.OkButton>
                            <Button
                                id="okButton"
                                onClick={() => setShowErrorContainer(false)}
                                size={"small"}
                                border={"hoverYellow"}
                                variant={"yellow"}
                                color={"white"}
                            >
                                확인
                            </Button>
                        </S.OkButton>
                    </S.ErrorContainer>
                )}

                <S.GoToWriteButtonWrapper>
                    <Button
                        onClick={handleButtonClick}
                        id="goToWrite"
                        size={"large"}
                        border={"hoverIndigo"}
                        variant={"indigo"}
                        color={"white"}
                    >
                        마음일지 적으러 가기
                    </Button>
                </S.GoToWriteButtonWrapper>
            </S.ImageWrapper>
        </>
    );
};

export default MyMindHome;
