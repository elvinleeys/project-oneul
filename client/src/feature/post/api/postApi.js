import { API_URL } from "../../../api/Api";

export const getPosts = async (type, email) => {
    if (type === "mine") {
        const res = await fetch(`${API_URL}/ourToday/checkMyPost/${email}`);
        return res.json();
    } else {
        const res = await fetch(`${API_URL}/ourToday/checkPost`);
        return res.json();
    }
};
