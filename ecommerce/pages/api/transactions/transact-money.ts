import {
  ShoppingTransactionSchemaType,
  shoppingTransactionSchema,
} from "./../../../schemas/shopping-transaction-schema";
import { ApiResponse } from "@/types/apiResponse";
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
      return res.status(500).json({
        status: "error",
        message: "Something went wrong. Please try again!",
      });
    }
    let body: ShoppingTransactionSchemaType;
    try {
      body = shoppingTransactionSchema.parse(req.body);
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Please enter all the required informations..",
      });
    }

    const response = await fetch(
      "https://we-bank.vercel.app/api/transactions/transact-money",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: body.userEmail,
          userId: body.userId,
          amount: body.amount,
        }),
      }
    );

    if (!response.ok) {
      const ans = await response.json();
      return res.status(500).json({
        status: "error",
        message: "Transaction failed.Please try again later",
        error: {
          errorCode: 400,
          errorBody: ans.error,
        },
      });
    }
    const parsedResponse = await response.json();
    return res.status(201).json({
      status: "success",
      message: "Transaction succesful!",
    });
  } else {
    return res.status(404).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
