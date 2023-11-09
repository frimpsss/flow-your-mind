import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = parseInt(process.env.PORT as string, 10) || 9090;

app.all("/", (req: Request, res: Response) => {
  return res.status(200).send("Flow your mind API");
});

app.listen(port, async () => {
  console.log(`Server up and spinning on port: ${port}`);
});
