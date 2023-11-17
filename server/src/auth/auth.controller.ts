import { CustomResponse } from "../utils";
import { prisma } from "../../prisma";
import { authRequestBody, loginResponse } from "./types";
import { HttpStatusCode } from "../utils";
import { authInputSchema } from "./auth.utils";
import { z } from "zod";
import {
  createAccessToken,
  createRefreshToken,
  hashPassword,
  isCorrectPassword,
} from "./auth.service";

export class AuthController {
  // register
  public async register({
    username,
    password,
  }: authRequestBody): Promise<CustomResponse<null | Error>> {
    try {
      authInputSchema.parse({
        username,
        password,
      });
      const founduser = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (founduser) {
        return new CustomResponse(
          HttpStatusCode.Conflict,
          "Username already taken"
        );
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

  // login
  public async login({
    username,
    password,
  }: authRequestBody): Promise<CustomResponse<loginResponse | Error | null>> {
    try {
      authInputSchema.parse({
        username,
        password,
      });
      const founduser = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!founduser) {
        return new CustomResponse(
          HttpStatusCode.NotFound,
          "Incorrect username or password"
        );
      }

      const isPasswordCorrect = await isCorrectPassword(
        password,
        founduser.password
      );
      if (!isPasswordCorrect) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "Incorrect username or password"
        );
      }
      const refreshToken = createRefreshToken(founduser.id);
      const accessToken = createAccessToken(founduser.id);

      await prisma.user.update({
        where: {
          id: founduser.id,
        },
        data: {
          tokens: [...founduser.tokens, refreshToken],
        },
      });
      return new CustomResponse(HttpStatusCode.Ok, "Log in succesful", {
        username: founduser.username,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
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
