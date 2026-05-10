import React, { useEffect, useState } from "react";
import { faCloudMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleXmark,
    faTrashCan,
    faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import S from "./style";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import DeleteMyMind from "./DeleteMyMind";
import { API_URL } from "../../shared/api/apiSlice";

const CheckMyMind = () => {
    const [datas, setDatas] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchParams] = useSearchParams();
    const date = searchParams.get("date");
    const navigate = useNavigate();

    useEffect(() => {
        const getDatas = async () => {
            //쿼리스트링으로 받은 날짜와 일치하는 마음일지 가져오기
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
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };
        if (date) {
            getDatas();
        }
    }, [date]);

    return (
        <>
            {visible && (
                <DeleteMyMind
                    visible={visible}
                    setVisible={setVisible}
                    date={date}
                />
            )}
            <S.Container>
                <S.GrayBackground className={visible ? "grayBackground" : ""}>
                    <S.CheckMyMindContainer>
                        <S.IconsWrapper>
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="faPenToSquare"
                                onClick={() =>
                                    navigate(
                                        `/calendar/checkMyMind/modifyMyMind?date=${date}`,
                                    )
                                }
                            />
                            <div>
                                <FontAwesomeIcon
                                    onClick={() => {
                                        setVisible(!visible);
                                    }}
                                    icon={faTrashCan}
                                    className="faTrashCan"
                                />
                            </div>
                            <Link to={"/calendar"}>
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className="faCircleXmark"
                                />
                            </Link>
                        </S.IconsWrapper>

                        <S.TitleWrapper>
                            <div>나의 지난 마음보기</div>
                            <div id="date">{date}</div>
                        </S.TitleWrapper>

                        <S.ContentWrapper>
                            <FontAwesomeIcon
                                icon={faCloudMoon}
                                className="cloudMoonIcon"
                            />
                            <div>
                                오늘 내가 느낀 감정
                                <div className="answer">{datas[0]}</div>
                            </div>
                        </S.ContentWrapper>

                        <S.ContentWrapper>
                            <FontAwesomeIcon
                                icon={faCloudMoon}
                                className="cloudMoonIcon"
                            />
                            <div>
                                감정에 대한 상황
                                <div className="answer">{datas[1]}</div>
                            </div>
                        </S.ContentWrapper>

                        <S.ContentWrapper>
                            <FontAwesomeIcon
                                icon={faCloudMoon}
                                className="cloudMoonIcon"
                            />
                            <div>
                                내가 바라는 것
                                <div className="answer">{datas[2]}</div>
                            </div>
                        </S.ContentWrapper>

                        <S.ContentWrapper>
                            <FontAwesomeIcon
                                icon={faCloudMoon}
                                className="cloudMoonIcon"
                            />
                            <div>
                                내가 남에게 듣고 싶은 말
                                <div className="answer">{datas[3]} </div>
                            </div>
                        </S.ContentWrapper>

                        <S.ContentWrapper>
                            <FontAwesomeIcon
                                icon={faCloudMoon}
                                className="cloudMoonIcon"
                            />
                            <div>
                                내가 나에게 해주고 싶은 말
                                <div className="answer">{datas[4]} </div>
                            </div>
                        </S.ContentWrapper>

                        <S.ContentWrapper>
                            <FontAwesomeIcon
                                icon={faCloudMoon}
                                className="cloudMoonIcon"
                            />
                            <div>
                                마음일지를 쓰고 난 후 나의 마음
                                <div className="answer"> {datas[5]} </div>
                            </div>
                        </S.ContentWrapper>
                    </S.CheckMyMindContainer>
                </S.GrayBackground>
            </S.Container>
        </>
    );
};

export default CheckMyMind;
