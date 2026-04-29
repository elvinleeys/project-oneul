import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useState } from "react";
import { iconMap } from "../../../constant/iconMap";

const ReactionBtn = ({ postId, type, count, reacted }) => {
    const [isActive, setIsActive] = useState(reacted);
    const [cnt, setCnt] = useState(count);
    const icon = isActive ? iconMap[type].solid : iconMap[type].regular;
    const color = iconMap[type].color;

    const handleClick = async () => {
        // optimistic update
        setIsActive((prev) => !prev);
        setCnt((prev) => (isActive ? prev - 1 : prev + 1));

        // try {
        //   await axios.post(`/api/reaction/toggle`, {
        //     postId,
        //     type
        //   });
        // } catch (e) {
        //   // 실패 시 롤백
        //   setIsActive(prev => !prev);
        //   setCnt(prev => (isActive ? prev + 1 : prev - 1));
        // }
    };

    return (
        <Reaction onClick={handleClick}>
            <FontAwesomeIcon icon={icon} color={color} />
            <span>{cnt}</span>
        </Reaction>
    );
};

export default ReactionBtn;

const Reaction = styled.label`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1.125rem;
    cursor: pointer;

    span {
        font-size: 0.625rem;
    }
`;
