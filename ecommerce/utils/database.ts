import mongoose from "mongoose";
export default async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log("error on connecting to DB");
  }
}
