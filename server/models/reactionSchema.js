import { Schema, model } from "mongoose";

const reactionSchema = new Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: "OurToday",
            required: true,
            index: true,
        },

        userEmail: {
            type: String,
            ref: "User",
            required: true,
            index: true,
        },

        type: {
            type: String,
            enum: ["heart", "like", "smile", "sad", "angry"],
            required: true,
            index: true,
        },
    },
    { timestamps: true },
);

// 동일 사용자가 같은 reaction 중복 방지
reactionSchema.index({ postId: 1, userEmail: 1, type: 1 }, { unique: true });

export default model("Reaction", reactionSchema, "reaction");
