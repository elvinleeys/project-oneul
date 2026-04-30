import { combineReducers } from "@reduxjs/toolkit";
import signUpReducer from "../feature/signup/signUpSlice";
import loginReducer from "../feature/login/logInSlice";
import commentReducer from "../feature/comment/model/commentSlice";
import postEditReducer from "../feature/post/model/postEditSlice";
import postReducer from "../feature/post/model/postSlice";
import modalReducer from "../feature/modal/model/modalSlice";

const rootReducer = combineReducers({
    signup: signUpReducer,
    login: loginReducer,
    comment: commentReducer,
    postEdit: postEditReducer,
    post: postReducer,
    modal: modalReducer,
});

export default rootReducer;
