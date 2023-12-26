import Product from "@/models/product-model";
import { ApiResponse } from "@/types/apiResponse";
import connectToDB from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "GET") {
    try {
      await connectToDB();
    } catch (err) {
      console.log("error connecting to databse from /api/[productId]");
      console.log(err);
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }
    // console.log(req.query.productId);
    const product = await Product.findOne({
      _id: req.query.productId,
    }).select("name description price imagePath");
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "No products found yet" });
    }
    return res.status(200).json({
      status: "success",
      message: "Showing details of single product",
      data: {
        product,
      },
    });
  } else {
    return res.status(404).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
