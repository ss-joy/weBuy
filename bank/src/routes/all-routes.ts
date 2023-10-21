import { Router } from "express";
import type { Request, Response } from "express";
export const router = Router();
import User from "../models/user-model";
import Secret from "../models/secret-model";
import Transaction from "../models/transaction-model";
import { v4 } from "uuid";
import { ApiResponse } from "../types/api-response";

router.post("/get-user", async (req: Request, res: Response) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ email: email });
  let apiResp: ApiResponse;
  if (!foundUser) {
    apiResp = {
      message: "User not found",
      status: "error",
    };
    return res.status(404).json(apiResp);
  }

  const ans2 = await Secret.create({
    user_id: foundUser._id,
    name: foundUser.name,
    email: foundUser.email,
    secret: Math.floor(Math.random() * 4000) + 1,
  });
  console.log(ans2);
  return res.status(200).json({
    user: foundUser,
    secret: ans2.secret,
  });
});

router.get("/make-order-done", async (req: Request, res: Response) => {
  console.log(req.query.txid);
  const ans = await Transaction.updateOne(
    { trxId: req.query.txid },
    {
      status: "Delivered",
    }
  );
  console.log(ans);
  if (ans) {
    return res.json({ msg: "status updated.you may refresh the page now" });
  }
});
