import connectToDB from "@/utils/database";
import User from "@/models/user-model";
import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse } from "@/types/apiResponse";
import {
  UserSignUpSchema,
  UserSignUpSchemaType,
} from "@/schemas/user-signup-schema";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "POST") {
    try {
      await connectToDB();
    } catch (err) {
      console.log("error connecting to Database");
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }
    try {
      UserSignUpSchema.omit({
        userConfirmPwd: true,
      }).parse(req.body);
    } catch (err) {
      console.log("on signup route", err.issues);

      return res.status(400).json({
        status: "error",
        message: "Please enter all the required informations..",
        error: {
          errorCode: 400,
          errorBody: err.issues,
        },
      });
    }
    const { userName, userEmail, userPwd }: UserSignUpSchemaType = req.body;

    const hashedPass = await hash(userPwd, 10);

    const dbResponse = await User.create({
      name: userName,
      email: userEmail,
      password: hashedPass,
    });
    if (!dbResponse) {
      return res.status(500).json({
        status: "error",
        message: "Could sign up the user",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: dbResponse,
    });
  } else {
    return res.status(400).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
