import type { Request, Response } from "express";
import User from "../models/user-model";
import Transaction from "../models/transaction-model";
import { v4 } from "uuid";
//code needs to upgrade.
//secret checking is not implemented

//dont use email
//use id
export async function makeNewTransaction(req: Request, res: Response) {
  const { address, cost, email, mobile, productQuantity } = req.body;
  console.log(address, cost, email, mobile, productQuantity);
  const user = await User.findOne({ email: email });
  console.log(user);
  if (user.money < cost) {
    return res
      .status(301)
      .json({ msg: "you dont have enough money in your account.sorry!" });
  }
  console.log(+user.money - +cost);
  const ans = await User.updateOne(
    { email: email },
    { money: +user.money - +cost }
  );
  const tans = await Transaction.create({
    address,
    productQuantity,
    email: email,
    cost: cost,
    trxId: v4(),
  });
  console.log(tans);
  res.status(201).json({ msg: "transaction complete" });
}

export async function getTransaction(req: Request, res: Response) {
  const ans = await Transaction.find({});
  res.json({ ans });
}
