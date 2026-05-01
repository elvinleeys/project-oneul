import React from "react";
import styled from "styled-components";

const Avatar = ({ src, size = 2, alt = "avatar" }) => {
    return (
        <Wrapper size={size}>
            {src ? (
                <Img src={src} alt={alt} $size={size} />
            ) : (
                <Img
                    src="/global/images/default.png"
                    alt="default-profile-image"
                    $size={size}
                />
            )}
        </Wrapper>
    );
};

export default Avatar;

const Wrapper = styled.div`
    width: ${({ size }) => size}rem;
    height: ${({ size }) => size}rem;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background: #eee;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
