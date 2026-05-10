import { combineReducers } from "@reduxjs/toolkit";
import signUpReducer from "../feature/signup/signUpSlice";
import loginReducer from "../feature/login/logInSlice";
import postEditReducer from "../feature/post/model/postEditSlice";
import postReducer from "../feature/post/model/postSlice";
import commentUIReducer from "../feature/comment/model/commentUISlice";
import modalReducer from "../feature/modal/model/modalSlice";
import { apiSlice } from "../shared/api/apiSlice";

const rootReducer = combineReducers({
    signup: signUpReducer,
    login: loginReducer,
    postEdit: postEditReducer,
    post: postReducer,
    commentUI: commentUIReducer,
    modal: modalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export default rootReducer;
