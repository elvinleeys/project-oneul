import styled, { css } from "styled-components";

const variantCSS = {
    active: css`
        background-color: ${({ theme }) => theme.PALETTE.white};
    `,
    inactive: css`
        background-color: ${({ theme }) => theme.PALETTE.hover["skyblue"]};
    `,
    error: css`
        background-color: ${({ theme }) => theme.PALETTE.error["red"]};
    `,
    success: css`
        background-color: ${({ theme }) => theme.PALETTE.successGreenInput};
    `,
};

const sizeCSS = {
    default: css`
        width: 260px;
        height: 44px;
    `,
};

const Input = styled.input`
    ${({ $variant }) => variantCSS[$variant]}
    ${({ $size }) => sizeCSS[$size]}
    border: none;
    padding: 0 20px;
    outline: none;
    height: 2.75rem;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
`;

export default Input;
