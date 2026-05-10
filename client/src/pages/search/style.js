import styled from "styled-components";
import { flexCenterColumn } from "../../global/common";

const S = {};

S.searchEmptyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

S.searchEmptyIconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    width: 80px;
    height: 80px;
    & img {
        width: 100%;
        height: 100%;
    }
`;

S.searchEmptyTextWrapper = styled.div`
    ${flexCenterColumn};
    width: 180px;
    height: 95px;
`;

S.searchEmptyText = styled.p`
    font-family: "Pretendard";
    font-size: 16px;
    color: #4d4e89;
    text-align: center;
`;

S.gap = styled.div`
    width: 100%;
    height: 70px;
`;

export default S;
