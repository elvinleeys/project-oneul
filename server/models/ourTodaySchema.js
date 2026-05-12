import { Schema, model, now } from "mongoose";

// post => user.id,
const ourTodaySchema = new Schema(
    {
        userEmail: {
            type: String,
            ref: "User",
            required: true,
        },

        userProfileImg: String,

        userNickname: String,

        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export default model("OurToday", ourTodaySchema, "ourToday");
