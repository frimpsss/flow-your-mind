import { CustomResponse } from "../utils";
import { prisma } from "../../prisma";
import { authRequestBody, loginResponse } from "./types";
import { HttpStatusCode } from "../utils";
import { authInputSchema, loginSchema } from "./auth.utils";
import jwt from "jsonwebtoken";
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
          "Username already taken",
          false
        );
      }
      const hashed_password = await hashPassword(password);
      await prisma.user.create({
        data: {
          username,
          password: hashed_password,
        },
      });
      return new CustomResponse(
        HttpStatusCode.Created,
        "Sign up succesful",
        true
      );
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          error.message,
          false,
          error as Error
        );
      }
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message as string,
        false,
        error as Error
      );
    }
  }

  // login
  public async login({
    username,
    password,
    token,
  }: authRequestBody): Promise<CustomResponse<loginResponse | Error | null>> {
    try {
      loginSchema.parse({
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
          "Incorrect username or password",
          false
        );
      }

      const isPasswordCorrect = await isCorrectPassword(
        password,
        founduser.password
      );
      if (!isPasswordCorrect) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "Incorrect username or password",
          false
        );
      }
      const refreshToken = createRefreshToken(founduser.id);
      const accessToken = createAccessToken(founduser.id);
      let newRefreshTokensArray = !token
        ? founduser.tokens
        : founduser.tokens.filter((t: string) => t !== token);

      if (token) {
        const foundToken = await prisma.user.findFirst({
          where: {
            id: founduser?.id,
            tokens: {
              has: token,
            },
          },
        });

        if (!foundToken) {
          await prisma.user.update({
            where: {
              id: founduser.id,
            },
            data: {
              tokens: [],
            },
          });
        }
      }

      await prisma.user.update({
        where: {
          id: founduser.id,
        },
        data: {
          tokens: [...newRefreshTokensArray, refreshToken],
        },
      });
      return new CustomResponse(HttpStatusCode.Ok, "Log in succesful", true, {
        username: founduser.username,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          error.message,
          false,
          error as Error
        );
      }
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message as string,
        false,
        error as Error
      );
    }
  }

  // generate refresh token
  /**
   * name
   */
  public async getAccessToken(
    refresh_token: string
  ): Promise<CustomResponse<any>> {
    try {
      if (!refresh_token.trim()) {
        return new CustomResponse(401, "Error somewhere", false);
      }
      const founduser = await prisma.user.findFirst({
        where: {
          tokens: {
            has: refresh_token as string,
          },
        },
      });

      // check for token in wrong hands
      if (!founduser) {
        jwt.verify(
          refresh_token,
          process.env.REFRESH_TOKEN_SECRET as string,
          async (error: unknown, decode: unknown) => {
            if (error) return;
            const { userId } = decode as { userId: string };
            const possibleUser = await prisma.user.findUnique({
              where: {
                id: userId,
              },
            });

            if (possibleUser) {
              await prisma.user.update({
                where: {
                  id: possibleUser.id,
                },
                data: {
                  tokens: [],
                },
              });
            }
          }
        );
        return new CustomResponse(
          HttpStatusCode.Unauthorized,
          "Invalid token",
          false
        );
      }
      try {
        const { userId } = jwt.verify(
          refresh_token,
          process.env.REFRESH_TOKEN_SECRET as string
        ) as { userId: string };
        const access_token = createAccessToken(userId);
        const new_refresh_token = createRefreshToken(userId);
        const newTokens = founduser.tokens.filter(
          (t: string) => t != refresh_token
        );

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            tokens: [...newTokens, new_refresh_token],
          },
        });

        return new CustomResponse(HttpStatusCode.Ok, undefined, true, {
          access_token,
          new_refresh_token,
        });
      } catch (err) {
        const newTokens = founduser.tokens.filter(
          (t: string) => t != refresh_token
        );
        await prisma.user.update({
          where: {
            id: founduser.id,
          },
          data: {
            tokens: newTokens,
          },
        });
        return new CustomResponse(
          HttpStatusCode.Unauthorized,
          "JWT malfunctioned",
          false
        );
      }
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message,
        false
      );
    }
  }
}
