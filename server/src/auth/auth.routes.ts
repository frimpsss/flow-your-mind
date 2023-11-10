import express from "express";
import type { Request, Response } from "express";
import { AuthController } from "./auth.controller";

export const authRouter = express.Router();
const controller = new AuthController()
authRouter.post("/register", async (req: Request, res: Response) => {
    const response = await controller.register({
        username: req.body.username, 
        password: req.body.password
    })

    res.status(response.statusCode).send(response)
});
