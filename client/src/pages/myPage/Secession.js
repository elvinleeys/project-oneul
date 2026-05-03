import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import OneulButton from "../../components/button/OneulButton";
import S from "./style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../feature/login/logInSlice";
import { API_URL } from "../../shared/api/apiSlice";

const Secession = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const goToMypage = () => {
        navigate("/myPage");
    };

    const deleteUserApi = async () => {
        try {
            const token = localStorage.getItem("token"); // 또는 쿠키에서 가져오기
            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await fetch(`${API_URL}/user/delete`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            localStorage.clear();
            dispatch(deleteUser(null, false));
            navigate("/logIn");
            return response.json();
        } catch (error) {
            console.error("Failed to delete user:", error.message);
            throw error; // 예외를 상위로 다시 던짐
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const result = await deleteUserApi();
            console.log("Account deleted:", result);
        } catch (error) {
            console.error("Failed to handle account deletion:", error.message);
        }
    };

    return (
        <>
            <S.MypageNav>
                <FontAwesomeIcon icon={faCircleXmark} onClick={goToMypage} />
            </S.MypageNav>
            <S.PageTitle>
                <h2 className="secession">탈퇴 전 확인 하세요</h2>
            </S.PageTitle>
            <S.SecessionCon>
                <p>정말 탈퇴 하시겠습니까?</p>
                <div>
                    <p>1. 프로필 및 작성하신 일지 내용은 모두 사라집니다</p>
                    <p>2.탈퇴로 인해 삭제된 정보는 복구가 불가합니다.</p>
                </div>
                <OneulButton
                    variant={"red"}
                    border={"default"}
                    size={"large"}
                    color={"white"}
                    onClick={handleDeleteAccount}
                >
                    탈퇴하기
                </OneulButton>
            </S.SecessionCon>
        </>
    );
};

export default Secession;
