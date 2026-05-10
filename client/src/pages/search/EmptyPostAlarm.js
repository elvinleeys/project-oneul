import React from "react";
import S from "./style";

const EmptyPostAlarm = ({ searchValue }) => {
    return (
        <S.searchEmptyContainer>
            {/* <S.searchEmptyIconWrapper>
                <img src={`${process.env.PUBLIC_URL}/global/images/heartCrack.png`} alt="heartCrack" />
            </S.searchEmptyIconWrapper> */}
            <S.searchEmptyTextWrapper>
                <S.searchEmptyText>
                    "{searchValue}"에 해당하는 글이
                    <br />
                    존재하지 않습니다.
                    <br />
                    <br />
                    키워드로 작성한 나의
                    <br />
                    오늘을 다른 사람과 공유해보는 것은 어떨까요?
                </S.searchEmptyText>
            </S.searchEmptyTextWrapper>
        </S.searchEmptyContainer>
    );
};

export default EmptyPostAlarm;
