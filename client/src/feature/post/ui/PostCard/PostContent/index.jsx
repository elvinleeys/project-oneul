import styled from "styled-components";

export const PostContent = ({ children, keyword }) => {
    if (!keyword) return <Content>{children}</Content>;

    const parts = children.split(new RegExp(`(${keyword})`, "gi"));
    return (
        <Content>
            {parts.map((part, i) =>
                part.toLowerCase() === keyword.toLowerCase() ? (
                    <Highlight key={i}>{part}</Highlight>
                ) : (
                    part
                ),
            )}
        </Content>
    );
};

const Content = styled.div`
    min-height: 12.5rem;
    padding: 1.25rem 1.75rem;
    font-size: 1rem;
    color: #142146;
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
`;

const Highlight = styled.mark`
    background-color: rgba(192, 128, 188, 0.4);
    font-weight: bold;
`;
