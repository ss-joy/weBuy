import { Router } from "express";
import {
  getTransaction,
  makeNewTransaction,
} from "../controllers/transaction-controller";
export const transactionRouter = Router();

transactionRouter.post("/new-transaction", makeNewTransaction);

transactionRouter.get("/get-transaction", getTransaction);
