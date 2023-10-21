import { Router } from "express";
import type { Response } from "express";
import { X } from "../models/dummy-model";

export const Dummyrouter = Router();
type resp = {
  msg: string;
};
Dummyrouter.get("/sei/sei", async (req, res: Response) => {
  const ans = await X.create({
    age: 23,
  });

  return res.json(ans);
});
