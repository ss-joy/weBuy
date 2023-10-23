import Product from "@/models/product-model";
import { ApiResponse } from "@/types/apiResponse";
import { ProductType } from "@/types/products-type";
import dbConnect from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method === "POST") {
    try {
      await dbConnect();
    } catch (err) {
      console.log("error connecting to databse from api folder");
      console.log(err);
    }
    const body: ProductType = req.body;
    if (!body.name || !body.description || !body.imagePath || !body.price) {
      return res.status(401).json({
        status: "error",
        message: "Please enter all the required informations of a product",
      });
    }
    const dbResp = await Product.create({
      name: body.name,
      description: body.description,
      price: Number(body.price),
      imagePath: body.imagePath,
    });
    if (!dbResp) {
      return res.status(500).json({
        status: "error",
        message:
          "Could not add product to database. Probaby some server error. Please try again.",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Product added successfully!!",
    });
  } else {
    return res.status(404).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
