import { CustomResponse } from "../utils";
import { prisma } from "../prisma";
import { authRequestBody } from "./types";
import { HttpStatusCode } from "../utils";
import { authInputSchema } from "./auth.utils";
import { z } from "zod";
import { hashPassword } from "./auth.service";

export class AuthController {
  public async register({
    username,
    password,
  }: authRequestBody): Promise<
    CustomResponse<undefined> | CustomResponse<Error>
  > {
    try {
      authInputSchema.parse({
        username,
        password,
      });
      const founduser = await prisma.user.findUnique({
        where: {
          username
        }
      })
      if(founduser){
        return new CustomResponse(HttpStatusCode.Conflict, "Username already taken")
      }
      const hashed_password = await hashPassword(password);
      await prisma.user.create({
        data: {
          username,
          password: hashed_password,
        },
      });
      return new CustomResponse(HttpStatusCode.Created, "Sign up succesful");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          error.message,
          error as Error
        );
      }
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message as string,
        error as Error
      );
    }
  }
}
