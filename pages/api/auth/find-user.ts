import connectToDB from "@/utils/database";
import User from "@/models/user-model";
import type { NextApiRequest, NextApiResponse } from "next";
import type { ApiResponse } from "@/types/apiResponse";

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
    if (!req.body?.userEcommerceId) {
      return res.status(400).json({
        status: "error",
        message: "Please enter all the required informations..",
      });
    }
    try {
      const data = await User.findById(req.body.userEcommerceId);
      if (data) {
        return res.status(200).json({
          status: "success",
          message: "Showing details of single user",
          data: data,
        });
      }
    } catch (error) {
      return res.status(403).json({
        status: "error",
        message: "User not found",
      });
    }
  } else {
    return res.status(405).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
