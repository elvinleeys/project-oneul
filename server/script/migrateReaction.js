import mongoose from "mongoose";
import OurToday from "../models/ourTodaySchema.js";
import Reaction from "../models/reactionSchema.js";
import dotenv from "dotenv";
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log("DB:", mongoose.connection.name);

const posts = await OurToday.find().lean();

console.log("posts length:", posts.length);
console.log(posts);

for (const post of posts) {
    const reactionTypes = ["heart", "like", "smile", "sad", "angry"];

    for (const type of reactionTypes) {
        const users = post[type] || [];

        for (const userEmail of users) {
            try {
                await Reaction.create({
                    postId: post._id,
                    userEmail,
                    type,
                });
            } catch (e) {
                console.log("skip duplicate");
            }
        }
    }
}

console.log("migration 완료");
process.exit();
