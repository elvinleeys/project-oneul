import { createAction, handleActions } from "redux-actions";

// actions의 타입 선언
const UPDATE_SIGNUP_DATA = "signup/UPDATE_SIGNUP_DATA";
const RESET_SIGNUP_DATA = "signup/RESET_SIGNUP_DATA";

// actions을 생성
export const updateSignUpData = createAction(UPDATE_SIGNUP_DATA);
export const resetSignUpData = createAction(RESET_SIGNUP_DATA);

// 초기 상태
const initialState = {
    email: "",
    password: "",
    name: "",
    mobile: "",
    nickname: "",
    profileImg: "",
    origin: "",
    token: "",
};

// reducer 제작
const signUpReducer = handleActions(
    {
        [UPDATE_SIGNUP_DATA]: (state, { payload }) => ({
            ...state,
            ...payload,
        }),
        [RESET_SIGNUP_DATA]: () => initialState,
    },
    initialState
);

export default signUpReducer;
