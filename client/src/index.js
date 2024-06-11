import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { combineReducers, legacy_createStore as createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import { Provider } from "react-redux";
// import signUp from "./modules/signUp";
import signUpReducer from "./modules/signUp";

const rootReducer = combineReducers({
    signup: signUpReducer,
});

// const store = createStore(signUp, devToolsEnhancer());
const store = createStore(rootReducer, devToolsEnhancer());


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Provider store={store}>
            <App />
        </Provider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
