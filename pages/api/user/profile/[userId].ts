import User from "@/models/user-model";
import { UserSignUpSchema } from "@/schemas/user-signup-schema";
import { ApiResponse } from "@/types/apiResponse";
import connectToDB from "@/utils/database";
import { hash } from "bcrypt";
import { MongooseError } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "GET") {
    try {
      await connectToDB();
    } catch (err) {
      console.log("error connecting to databse from /api/user/profile[userId]");
      console.log(err);
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }

    try {
      const user = await User.findOne({
        _id: req.query.userId,
      }).select("name email profilePicture");
      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }
      return res.status(200).json({
        status: "success",
        message: "Showing details of single product",
        data: {
          user,
        },
      });
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(400).json({
          status: "error",
          message: "Please enter all the required informations..",
        });
      }
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }
  } else if (req.method === "POST") {
    try {
      await connectToDB();
    } catch (err) {
      console.log("error connecting to databse from /api/user/profile[userId]");
      console.log(err);
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }
    try {
      const updateProfileSchema = z.object({
        userName: z.string().optional(),
        userImage: z.string().optional(),
        userPwd: z.string().optional(),
      });
      const data = updateProfileSchema.parse(req.body);

      const oldUSerData = await User.findById(req.query.userId);
      if (!oldUSerData) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }

      let hashedPwd = "";
      if (data.userPwd) {
        hashedPwd = await hash(data.userPwd, 6);
      }

      const resp = await User.updateOne(
        { _id: req.query.userId },
        {
          name: data.userName ? data.userName : oldUSerData.name,
          password: data.userPwd ? hashedPwd : oldUSerData.password,
          profilePicture: data.userImage
            ? data.userImage
            : oldUSerData.profilePicture,
        }
      );
      if (!resp) {
        return res.status(500).json({
          status: "success",
          message: "Something went wrong. Please try again!",
          data: resp,
        });
      }
      return res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: resp,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Please enter all the required informations..",
      });
    }
  } else {
    return res.status(404).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
