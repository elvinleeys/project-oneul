import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { iconMap } from "../../../shared/config/iconMap";
import { useToggleReaction } from "../model/useToggleReaction";

const ReactionBtn = ({ postId, type, count, reacted }) => {
    // const [isActive, setIsActive] = useState(reacted);
    // const [cnt, setCnt] = useState(count);
    const { handleToggleReaction, isLoading } = useToggleReaction({
        postId,
        type,
        reacted,
    });

    const icon = reacted ? iconMap[type].solid : iconMap[type].regular;
    const color = iconMap[type].color;
    // const handleClick = async () => {
    //     // optimistic update
    //     setIsActive((prev) => !prev);
    //     setCnt((prev) => (isActive ? prev - 1 : prev + 1));

    //     // try {
    //     //   await axios.post(`/api/reaction/toggle`, {
    //     //     postId,
    //     //     type
    //     //   });
    //     // } catch (e) {
    //     //   // 실패 시 롤백
    //     //   setIsActive(prev => !prev);
    //     //   setCnt(prev => (isActive ? prev + 1 : prev - 1));
    //     // }
    // };

    return (
        <Reaction
            $color={color}
            onClick={handleToggleReaction}
            disabled={isLoading}
        >
            <FontAwesomeIcon icon={icon} className="reaction-icon" />
            <span>{count}</span>
        </Reaction>
    );
};

export default React.memo(
    ReactionBtn,
    (prev, next) => prev.count === next.count && prev.reacted === next.reacted,
);

const Reaction = styled.button`
    height: auto;
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1.125rem;
    cursor: pointer;

    span {
        font-size: 0.625rem;
        min-width: 2ch;
        text-align: left;
    }

    & .reaction-icon path {
        color: ${({ $color }) => $color};
    }
`;
