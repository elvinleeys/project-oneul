import { motion } from "framer-motion";
import styled from "styled-components";

export const Tab = ({ children, $active, ...props }) => {
    return (
        <TabBtn $active={$active} {...props}>
            {children}
            {$active && <Underline layoutId="underline" />}
        </TabBtn>
    );
};

const TabBtn = styled.button`
    position: relative;
    background: none;
    border: none;
    padding-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: ${({ $active }) => ($active ? "bold" : 300)};
    color: #142146;
    cursor: pointer;
`;

const Underline = styled(motion.div)`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4px;
    background: #5487d3;
`;
