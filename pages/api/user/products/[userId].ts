import Product from "@/models/product-model";
import User from "@/models/user-model";
import { ApiResponse } from "@/types/apiResponse";
import connectToDB from "@/utils/database";
import { MongooseError } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
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
    if (!req.query.userId) {
      return res.status(400).json({
        status: "error",
        message: "Please enter all the required informations..",
      });
    }

    try {
      const user = await User.findOne({
        _id: req.query.userId,
      });
      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(400).json({
          status: "error",
          message: "Please enter all the required informations..",
        });
      }
    }
    try {
      const products = await Product.find({ sellerId: req.query.userId });
      if (products) {
        return res.status(200).json({
          status: "success",
          message: "Showing list of products",
          data: products,
        });
      }
    } catch (error) {
      return res.status(500).json({
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
