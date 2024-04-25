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
    token: req.cookies?.auth,
  });
  if (response.statusCode === HttpStatusCode.Ok) {
    const { refresh_token, username, access_token } =
      response.data as loginResponse;
    return res
      .cookie("auth", refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 60 * 60 * 60,
        path: "/",
        secure: true,
        sameSite: "none",
        domain: req.headers.origin,
      })
      .status(response.statusCode)
      .send({
        access_token,
        username,
        status: response.status,
      });
  }
  res.clearCookie("auth");
  return res.status(response.statusCode).send(response);
});

authRouter.get("/refresh", async (req: Request, res: Response) => {
  const cookie = req.cookies?.auth;
  if (!cookie) {
    return res.status(HttpStatusCode.Unauthorized).send("No cookie");
  }
  const response = await controller.getAccessToken(cookie);
  if (response.statusCode == HttpStatusCode.Ok) {
    return res
      .cookie("auth", response?.data?.new_refresh_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 60 * 60 * 60,
        path: "/",
        secure: true,
        sameSite: "none",
        domain: req.headers.origin,
      })
      .status(response.statusCode)
      .send({
        access_token: response?.data?.access_token,
        status: response.status,
      });
  }
  return res.status(response.statusCode).send(response);
});
