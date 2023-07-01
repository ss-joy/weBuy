import connectToDB from "@/utils/database";
import User from "@/models/user-model";
import { hash } from "bcrypt";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectToDB();
    } catch (err) {
      console.log("error on BD");
    }

    const { name, email, password } = req.body;

    const hashedPass = await hash(password, 10);

    const insertUser = new User({
      name,
      email,
      password: hashedPass,
    });
    const databseResponse = await insertUser.save();
    return res.status(200).json({ user: databseResponse });
  }
}
