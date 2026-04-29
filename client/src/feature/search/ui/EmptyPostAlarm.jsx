import React from "react";
import styled from "styled-components";

const EmptyPostAlarm = ({ searchValue }) => {
    return (
        <PostContainer>
            <EmptyText>
                "{searchValue}"에 해당하는 글이
                <br />
                존재하지 않습니다.
                <br />
                <br />
                키워드로 작성한 나의
                <br />
                오늘을 다른 사람과 공유해보는 것은 어떨까요?
            </EmptyText>
        </PostContainer>
    );
};

export default EmptyPostAlarm;

const PostContainer = styled.div`
    width: 20rem;
    height: 20rem;
    background-color: #ffffff;
    border-radius: 1.25rem;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EmptyText = styled.p`
    font-size: 1rem;
    font-family: "Pretendard";
    color: #4d4e89;
`;
