import type { Request, Response } from "express";
import User from "../models/user-model";
import { ApiResponse } from "../types/api-response";
export async function addUser(req: Request, res: Response) {
  const { username, email, password } = req.body;
  const dbResp = await User.create({
    name: username,
    email: email,
    password: password,
  });
  let apiResp: ApiResponse;
  if (!dbResp) {
    apiResp = {
      message: "Some error happend. Please check details.",
      status: "error",
    };
    return res.status(500).json(apiResp);
  }
  apiResp = {
    status: "success",
    message: "User created successfully",
  };
  return res.status(201).json(apiResp);
}
