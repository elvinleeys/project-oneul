import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreatePostMutation, useUpdatePostMutation } from "../api/postApi";

export const usePostEditor = ({ content, currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { postId } = useParams();

    const isEditMode = Boolean(postId);

    const [createPost] = useCreatePostMutation();

    const [updatePost] = useUpdatePostMutation();

    const handleSubmit = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);

            if (isEditMode) {
                await updatePost({
                    postId,
                    content,
                }).unwrap();
            } else {
                await createPost({
                    userEmail: currentUser.email,
                    content,
                    userProfileImg: currentUser.profileImg,
                    userNickname: currentUser.nickname,

                    heart: [],
                    like: [],
                    smile: [],
                    angry: [],
                    sad: [],
                }).unwrap();
            }

            navigate("/ourToday");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        isEditMode,
        handleSubmit,
    };
};
