import styled from "styled-components";
import variantMap from "../../config/color";

const sizeMap = {
    default: "16.25rem" /* 260px */,
    small: "8rem",
};

const Button = styled.button`
    width: ${({ $full, size }) => ($full ? "100%" : sizeMap[size] || "auto")};
    padding: 0.625rem 0; /* 10px */
    border-radius: 1.25rem; /* 20px */
    border: 0.125rem solid transparent; /* 2px */
    font-size: 1rem;
    cursor: pointer;

    ${({ $variant }) => variantMap[$variant]};

    &:hover {
        opacity: 0.9;
    }

    &:active {
        opacity: 0.8;
    }

    &:disabled {
        background: #bec1c5;
        color: #fff;
        cursor: not-allowed;
    }
`;

export default Button;
