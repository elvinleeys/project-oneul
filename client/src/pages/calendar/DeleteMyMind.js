import React from "react";
import S from "./style";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/style";
import { API_URL } from "../../shared/api/apiSlice";

const DeleteMyMind = ({ visible, setVisible, date }) => {
    const navigate = useNavigate();
    const handleDelete = async () => {
        //마음일지 삭제하기
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/myMind/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    createdAt: date,
                }),
            });
            if (!response.ok) {
                throw new Error("데이터 삭제에 실패했습니다.");
            } else {
                console.log("데이터를 삭제 성공");
            }
            setVisible(false);
        } catch (error) {
            console.error("데이터 삭제 중 에러 발생:", error);
        }
    };
    const navigateToCalendar = () => {
        navigate(`/calendar`);
    };

    return (
        <>
            {visible && (
                <S.DeletePageContainer>
                    <S.DeleteContainer>
                        <S.DeleteTitle>삭제</S.DeleteTitle>
                        <S.DeleteTexts>
                            <div>내용을 정말로 삭제하시겠습니까?</div>
                            <div>삭제 시 복구할 수 없습니다.</div>
                        </S.DeleteTexts>
                        <S.DeleteButtons>
                            <Button
                                onClick={() => {
                                    setVisible(false);
                                }}
                                id="button01"
                                size={"small"}
                                border={"hoverSkyblue"}
                                variant={"skyblue"}
                                color={"white"}
                            >
                                취소
                            </Button>
                            <Button
                                onClick={() => {
                                    handleDelete();
                                    navigateToCalendar();
                                }}
                                id="button02"
                                size={"small"}
                                border={"hoverRed"}
                                variant={"red"}
                                color={"white"}
                            >
                                삭제
                            </Button>
                        </S.DeleteButtons>
                    </S.DeleteContainer>
                </S.DeletePageContainer>
            )}
        </>
    );
};

export default DeleteMyMind;
