import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTab } from "../../model/postSlice";
import { Tab } from "./Tab";
import { reset, startCreate } from "../../model/postEditSlice";

const TABS = [
    { label: "우리의 오늘", value: "all" },
    { label: "나의 오늘", value: "mine" },
];

const TabMenu = () => {
    const [activeTab, setActiveTab] = useState("all");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnClick = (tabValue) => {
        setActiveTab(tabValue);
        dispatch(setTab(tabValue));
    };

    return (
        <Menu>
            <TabWrapper>
                {TABS.map(({ label, value }) => (
                    <Tab
                        key={value}
                        $active={activeTab === value}
                        onClick={() => handleOnClick(value)}
                    >
                        {label}
                    </Tab>
                ))}
            </TabWrapper>
            <WriteButton
                onClick={() => {
                    dispatch(reset());
                    navigate("/post/new");
                }}
            >
                나의 오늘 쓰기
            </WriteButton>
        </Menu>
    );
};

export default TabMenu;

const Menu = styled.div`
    padding: 1.4375rem 1.125rem 0 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TabWrapper = styled.div`
    display: flex;
    gap: 0.875rem;
`;

const WriteButton = styled.button`
    background: #4d4e89;
    color: #fff;
    border: none;
    border-radius: 1.25rem;
    padding: 0.65rem 0.85rem;
    font-size: 1rem;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
`;
