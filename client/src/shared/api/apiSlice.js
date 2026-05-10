import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_URL =
    process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_URL
        : "http://localhost:8000";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    tagTypes: ["Post", "Comment"],
    endpoints: () => ({}),
});
