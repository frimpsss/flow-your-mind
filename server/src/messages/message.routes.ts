import { Router, Request, Response } from "express";
import { verifyToken } from "../middleware/verify.token";
import { MessageController } from "./messages.controller";

export const messageRouter = Router();
const messageController = new MessageController();
messageRouter.post("/message", async (req: Request, res: Response) => {
  const response = await messageController.createMessage(
    req.body.username,
    req.body.message
  );

  res.status(response.statusCode).send(response);
});
messageRouter.get(
  "/messages",
  verifyToken,
  async (req: Request, res: Response) => {
    const response = await messageController.getAllMessages(req.body.userId);

    res.status(response.statusCode).send(response);
  }
);

messageRouter.get(
  "/username/:username",
  async (req: Request, res: Response) => {
    const response = await messageController.getUserId(req.params.username);
    res.status(response.statusCode).send(response);
  }
);
