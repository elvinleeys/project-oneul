import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { reset, setContent } from "../feature/post/model/postEditSlice";
import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";

const PostEdit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { mode, content } = useSelector((s) => s.postEdit);

    return (
        <PostEditForm>
            <Title>나의 오늘을 다른 사람과 나눠볼까요?</Title>
            <ContentWrapper>
                <TextArea
                    name="post-content"
                    value={content}
                    onChange={(e) => dispatch(setContent(e.target.value))}
                    placeholder="나의 오늘을 작성해주세요"
                    autoFocus
                />
            </ContentWrapper>
            <BtnWrapper>
                <Button
                    $variant="secondary"
                    size="default"
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    {mode === "edit" ? "수정 완료" : "작성 완료"}
                </Button>
                <Button
                    $variant="tertiary"
                    size="default"
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(reset());
                        navigate("/");
                    }}
                >
                    취소
                </Button>
            </BtnWrapper>
        </PostEditForm>
    );
};

export default PostEdit;

const PostEditForm = styled.form`
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
`;

const Title = styled.p`
    font-size: 1rem;
    text-align: center;
    margin: 0;
`;

const ContentWrapper = styled.div`
    width: 16.5rem;
    height: 16.5rem;
    background-color: #ffffff;
    padding: 1.25rem 1.75rem;
    border-radius: 1.25rem;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);
    margin-bottom: 0.25rem;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    font-size: 1rem;
    border: none;
    resize: none;
    outline: none;
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
