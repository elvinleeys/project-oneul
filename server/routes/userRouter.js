import express from "express";
import passport from "passport";
import {
    authLocation,
    checkEmail,
    checkMobile,
    checkNickname,
    deleteUser,
    getUserProfile,
    loginUser,
    passportLogin,
    signupUser,
    updateUser,
    uploadProfileImg,
} from "../controller/user/user.js";
import multer from "multer";

// Multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/profile");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/checkEmail", checkEmail);
userRouter.post("/checkMobile", checkMobile);
userRouter.post("/checkNickname", checkNickname);
userRouter.post("/uploadProfileImg", upload.single("profileImg"), uploadProfileImg);
userRouter.post("/signup", signupUser);
userRouter.put("/update", updateUser);
userRouter.delete("/delete", deleteUser);

// passport 추가
userRouter.post("/passportLogin", passportLogin);

// 추가로 인증 후 접근해야하는 fetch마다 authenticateLocal()을 심는다.
userRouter.post("/auth", passport.authenticate("jwt", { session: false }), authLocation);

userRouter.get("/getProfile/:email", getUserProfile);

export default userRouter;
