import React from "react";
import Backdrop from "../Backdrop";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const BottomSheet = ({ isOpen, onClose, children }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <Backdrop align="bottom" closeOnClick={false}>
                    <Sheet
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 28,
                            stiffness: 300,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        drag="y"
                        dragConstraints={{ top: 0 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 120) {
                                onClose();
                            }
                        }}
                        dragSnapToOrigin
                    >
                        <Handle />
                        {children}
                    </Sheet>
                </Backdrop>
            )}
        </AnimatePresence>
    );
};

export default BottomSheet;

const Sheet = styled(motion.div)`
    width: 100%;
    max-height: 80vh;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #fff;
    border-radius: 24px 24px 0 0;
`;

const Handle = styled.button`
    width: 2.25rem;
    height: 0.25rem;
    box-shadow: none;
    background: #ddd;
    border: none;
    border-radius: 2px;
    margin: 0.75rem auto 0.25rem;
`;
