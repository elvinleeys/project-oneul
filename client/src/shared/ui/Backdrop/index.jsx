import styled from "styled-components";
import { motion } from "framer-motion";

const Backdrop = ({
    children,
    closeOnClick = true,
    onClick,
    align = "center",
}) => {
    return (
        <Wrapper
            onClick={closeOnClick ? onClick : undefined}
            $align={align}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </Wrapper>
    );
};

export default Backdrop;

const Wrapper = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    justify-content: center;

    align-items: ${({ $align }) =>
        $align === "bottom" ? "flex-end" : "center"};
`;
