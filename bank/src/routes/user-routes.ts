import { Router } from "express";
import { addUser } from "../controllers/user-controller";
export const userRouter = Router();
userRouter.post("/add-user", addUser);
