import styled, { css } from "styled-components";

const variantCSS = {
    skyblue: css`
        background-color: ${({ theme }) => theme.PALETTE.skyblue};
    `,
    indigo: css`
        background-color: ${({ theme }) => theme.PALETTE.indigo};
    `,
    red: css`
        background-color: ${({ theme }) => theme.PALETTE.error["red"]};
    `,
    yellow: css`
        background-color: ${({ theme }) => theme.PALETTE.error["yellow"]};
    `,
    disabled: css`
        background-color: ${({ theme }) => theme.PALETTE.disabled};
    `,
    hoverSkyblue: css`
        background-color: ${({ theme }) => theme.PALETTE.hover["skyblue"]};
    `,
    hoverIndigo: css`
        background-color: ${({ theme }) => theme.PALETTE.hover["indigo"]};
    `,
    hoverRed: css`
        background-color: ${({ theme }) => theme.PALETTE.hover["red"]};
    `,
};

const borderCSS = {
    default: css`
        border: none;
    `,
    hoverSkyblue: css`
        border: 2px #5487d3 solid;
    `,
    hoverIndigo: css`
        border: 2px #4d4e89 solid;
    `,
    hoverRed: css`
        border: 2px #ee6161 solid;
    `,
    hoverYellow: css`
        border: 2px #ffb342 solid;
    `,
};

const sizeCSS = {
    small: css`
        width: 100px;
        height: 44px;
    `,
    medium: css`
        width: 120px;
        height: 44px;
    `,
    large: css`
        width: 260px;
        height: 44px;
    `,
};

const colorCSS = {
    black: css`
        color: ${({ theme }) => theme.PALETTE.black};
    `,
    white: css`
        color: ${({ theme }) => theme.PALETTE.white};
    `,
    hoverSkyblue: css`
        color: ${({ theme }) => theme.PALETTE.skyblue};
    `,
    hoverIndigo: css`
        color: ${({ theme }) => theme.PALETTE.indigo};
    `,
    hoverRed: css`
        color: ${({ theme }) => theme.PALETTE.error.red};
    `,
};

const Button = styled.button`
    ${({ $variant }) => variantCSS[$variant]}
    ${({ $border }) => borderCSS[$border]}
    ${({ $size }) => sizeCSS[$size]}
    ${({ $color }) => colorCSS[$color]}

    cursor: pointer;
`;

export default Button;
