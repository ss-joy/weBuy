import Product from "@/models/product-model";
import { ApiResponse } from "@/types/apiResponse";
import dbConnect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "GET") {
    return res.status(404).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }

  try {
    await dbConnect();
  } catch (err) {
    console.log("error connecting to databse from api folder");
    console.log(err);
  }
  console.log(req.query.productName);
  if (!req?.query?.productName) {
    return res.status(400).json({
      status: "error",
      message: "Something went wrong. Please try again!",
    });
  }

  try {
    const products = await Product.find({
      name: new RegExp(req.query.productName as string, "i"),
    }).exec();
    res.status(200).json({
      status: "success",
      message: "Showing list of products",
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again!",
    });
  }
}
