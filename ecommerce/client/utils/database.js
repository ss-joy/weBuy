import mongoose from "mongoose";
export default async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://userOne:12345@cluster1.exfjbjn.mongodb.net/we-buy?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.log("error on connecting to DB");
  }
}
