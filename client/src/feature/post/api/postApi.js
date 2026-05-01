import { API_URL } from "../../../api/Api";

export const getPosts = async (type, email) => {
    if (type === "mine") {
        const res = await fetch(`${API_URL}/ourToday/checkMyPost/${email}`);
        const data = await res.json();
        console.log("내 게시글 데이터", data);
        return data;
    } else {
        const res = await fetch(`${API_URL}/ourToday/checkPost`);
        const data = await res.json();
        console.log("전체 게시글 데이터", data);
        return data;
    }
};
