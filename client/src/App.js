import "./App.css";
import { ThemeProvider } from "styled-components";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import theme from "./global/theme";
import GlobalStyle from "./global/global";
import { FormProvider } from "./pages/myMind/context/FormContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserStatus } from "./feature/login/logInSlice";
import { API_URL } from "./api/Api";

function App() {
    const currentUser = useSelector((state) => state.login.currentUser);
    const userStatus = useSelector((state) => state.login.isLogin);
    const dispatch = useDispatch();

    // 최초 1번 토큰의 여부 검증
    useEffect(() => {
        const isAuthenticate = async () => {
            const response = await fetch(`${API_URL}/user/auth`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (!response.ok) {
                return;
            }
            const getAuthenticate = await response.json();
            return getAuthenticate;
        };

        isAuthenticate()
            .then((res) => {
                console.log(res);
                let { message, ...user } = res;
                dispatch(setUser(user));
                dispatch(setUserStatus(true));
            })
            .catch(console.error);
    }, [dispatch]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <FormProvider>
                    <RouterProvider router={router} />
                    <GlobalStyle />
                </FormProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
