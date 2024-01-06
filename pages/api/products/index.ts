import Product from "@/models/product-model";
import { ApiResponse } from "@/types/apiResponse";
import dbConnect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "GET") {
    try {
      await dbConnect();
    } catch (err) {
      console.log("error connecting to databse from api folder");
      console.log(err);
    }
    console.log(req.query);
    if (!req.query.productCategory) {
      const products = await Product.find({}).exec();
      if (products.length === 0) {
        return res.status(200).json({
          message: "No products found yet",
          status: "success",
          data: [],
        });
      }
      return res.status(200).json({
        message: "Showing list of products",
        status: "success",
        data: products,
      });
    } else if (req.query.productCategory) {
      const products = await Product.find({
        productCategory: req.query.productCategory,
      }).exec();
      if (products.length === 0) {
        return res.status(200).json({
          message: "No products found yet",
          status: "success",
          data: [],
        });
      }
      return res.status(200).json({
        message: "Showing list of products",
        status: "success",
        data: products,
      });
    }
  } else {
    return res.status(404).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
