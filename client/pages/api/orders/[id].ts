import { bankBaseUrl } from "@/config";
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
    if (!req.query.id) {
      return res.status(400).json({
        status: "error",
        message: "Please enter all the required informations..",
      });
    }
    const response = await fetch(
      `${bankBaseUrl}/api/transactions/${req.query.id}`
    );
    if (!response.ok) {
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }
    const parsedResponse = await response.json();
    return res.status(200).json({
      status: "success",
      message: "Showing all prouct transactions",
      data: parsedResponse.data,
    });
  } else {
    return res.status(404).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
