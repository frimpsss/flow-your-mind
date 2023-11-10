import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { HttpStatusCode } from "./utils";
import { authRouter } from "./auth/auth.routes";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const port = parseInt(process.env.PORT as string, 10) || 9090;

app.use(express.json(), bodyParser.json());

app.use("/api", authRouter);
app.all("/", (req: Request, res: Response) => {
  return res.status(HttpStatusCode.Ok).send("Flow your mind API");
});

app.listen(port, async () => {
  console.log(`Server up and spinning on port: ${port}`);
});
