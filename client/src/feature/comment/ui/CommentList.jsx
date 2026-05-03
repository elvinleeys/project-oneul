import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import styled from "styled-components";
import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
    return (
        <List>
            <AnimatePresence>
                {comments?.map((c, i) => (
                    <motion.div
                        key={c._id}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <CommentItem c={c} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </List>
    );
};

export default CommentList;

const List = styled.div`
    padding: 0 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 5rem;
`;
