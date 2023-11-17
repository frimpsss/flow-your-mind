import express from "express";
import type { Request, Response } from "express";
import { AuthController } from "./auth.controller";
import { HttpStatusCode } from "../utils";
import { loginResponse } from "./types";

export const authRouter = express.Router();
const controller = new AuthController();
authRouter.post("/register", async (req: Request, res: Response) => {
  const response = await controller.register({
    username: req.body.username,
    password: req.body.password,
  });

  res.status(response.statusCode).send(response);
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const response = await controller.login({
    username: req.body.username,
    password: req.body.password,
  });

  if (response.statusCode === HttpStatusCode.Ok) {
    const { access_token } = response.data as loginResponse;
    return res
      .cookie("authorization", access_token, {
        httpOnly: process.env.NODE_ENV === "development",
        maxAge: 86400000,
        sameSite: "strict",
        path: "/",
      })
      .status(response.statusCode)
      .send(response);
  }

  return res.status(response.statusCode).send(response);
});
