import Product from "@/models/product-model";
import { ApiResponse } from "@/types/apiResponse";
import { productSchema, productSchemaType } from "@/types/products-type";
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
    const body: productSchemaType = req.body;
    let product;
    try {
      product = productSchema
        .omit({
          _id: true,
        })
        .parse(body);
    } catch (err) {
      return res.status(401).json({
        status: "error",
        error: {
          errorCode: 400,
          errorBody: err,
        },
        message: "Please enter all the required informations..",
      });
    }

    const dbResp = await Product.create({
      name: product.name,
      description: product.description,
      price: Number(product.price),
      imagePath: product.imagePath,
      sellerName: product.sellerName,
      sellerId: product.sellerId,
      productCategory: product.productCategory,
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
