import ReactDOM from "react-dom";
import React from "react";
import Backdrop from "../Backdrop";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const ModalPortal = ({ children }) =>
    ReactDOM.createPortal(children, document.body);

const Dialog = ({ isOpen, onCancel, children }) => {
    return (
        <ModalPortal>
            <AnimatePresence>
                {isOpen && (
                    <Backdrop onClick={onCancel}>
                        <ModalBox
                            initial={{ opacity: 0, scale: 0.88, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.88, y: 16 }}
                            transition={{
                                type: "spring",
                                damping: 22,
                                stiffness: 300,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {children}
                        </ModalBox>
                    </Backdrop>
                )}
            </AnimatePresence>
        </ModalPortal>
    );
};

export default Dialog;

const ModalBox = styled(motion.div)`
    width: 100%;
    max-width: 20rem;
    background: #fff;
    border-radius: 1.25rem;
    padding: 1.75rem 1.25rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.18);
`;
