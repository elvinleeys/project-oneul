import mongoose from "mongoose";
import dotenv from "dotenv";
import OurToday from "../models/ourTodaySchema.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const before = await OurToday.findOne();
console.log("BEFORE:", before);

const result = await OurToday.updateMany(
    {},
    { $unset: { heart: "", like: "", smile: "", sad: "", angry: "" } },
    { strict: false },
);

console.log("result:", result);
console.log("matched:", result.matchedCount);
console.log("modified:", result.modifiedCount);
console.log("migration 완료");

const after = await OurToday.findOne();
console.log("AFTER:", after);

const check = await OurToday.find({}, { heart: 1 });

console.log(check);

process.exit();
