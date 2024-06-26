import { incrementProductSellCOunt } from "@/lib";
import {
  ShoppingTransactionSchemaType,
  shoppingTransactionSchema,
} from "./../../../schemas/shopping-transaction-schema";
import { ApiResponse } from "@/types/apiResponse";
import dbConnect from "@/utils/database";
import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { bankBaseUrl } from "@/config";

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
        error: {
          errorCode: 400,
          errorBody: error,
        },
      });
    }

    // const response = await fetch(
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       buyerEmail: body.buyerEmail,
    //       buyerId: body.buyerId,
    //       totalCost: body.totalCost,
    //       cartProductsDetails: body.cartProductsDetails,
    //     }),
    //   }
    // );
    let response;
    try {
      response = await axios.post(
        `${bankBaseUrl}/api/transactions/transact-money`,
        {
          buyerEmail: body.buyerEmail,
          buyerId: body.buyerId,
          totalCost: body.totalCost,
          cartProductsDetails: body.cartProductsDetails,
        }
      );
      if (response.data.status === "error") {
        throw new Error("transaction failed");
      }
    } catch (error) {
      console.log((error as AxiosError).response?.data);
      return res.status(500).json({
        status: "error",
        //@ts-ignore
        message: (error as AxiosError).response?.data
          .message as "Transaction failed.Please try again later",
        error: {
          errorCode: 500,
          errorBody: error,
        },
      });
    }
    if (response.data.status === "success") {
      try {
        await Promise.all(
          body.cartProductsDetails.map((product) => {
            return incrementProductSellCOunt(product);
          })
        );
        res.status(201).json({
          status: "success",
          message: "Transaction succesful!",
        });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Transaction failed.Please try again later",
          error: {
            errorCode: 500,
            errorBody: error,
          },
        });
      }
    }
  } else {
    return res.status(404).json({
      status: "error",
      message: "Url/method not supported!",
    });
  }
}
