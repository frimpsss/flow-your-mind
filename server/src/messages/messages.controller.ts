import { CustomResponse, HttpStatusCode } from "../utils";
import { prisma } from "../../prisma";
import { encryptText } from "../services/encryption.service";
import { MessageDTO } from "./message.utils";
export class MessageController {
  /**
   * create Message
   */
  public async createMessage(
    id: string,
    message: string
  ): Promise<CustomResponse<any | Error>> {
    try {
      const encryptedMessage = encryptText(message);
      await prisma.message.create({
        data: {
          content: encryptedMessage,
          reciepientId: id,
        },
      });
      return new CustomResponse(
        HttpStatusCode.Created,
        "Message sent succesfully",
        true
      );
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message,
        false
      );
    }
  }

  public async getAllMessages(
    id: string
  ): Promise<CustomResponse<MessageDTO[] | Error>> {
    try {
      const messages = await prisma.message.findMany({
        where: {
          reciepientId: id,
        },
      });

      const d = messages.map((e) => new MessageDTO(e));

      return new CustomResponse(
        HttpStatusCode.Ok,
        "all messages retrieved",
        true,
        d
      );
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message,
        false
      );
    }
  }

  public async getUserId(
    username: string
  ): Promise<CustomResponse<string | Error>> {
    try {
      if (!username.trim()) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "Pass username",
          false
        );
      }
      const founduser = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!founduser) {
        return new CustomResponse(404, "Username not found", false);
      }

      return new CustomResponse(
        HttpStatusCode.Ok,
        "User id retrieved",
        true,
        founduser.id
      );
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message,
        false
      );
    }
  }

  public async getSingleMessage(
    userId: string,
    messageId: string
  ): Promise<CustomResponse<any>> {
    try {
      if (!userId || !messageId) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "invalid body ",
          false
        );
      }

      const founduser = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          messages: true,
        },
      });

      if (!founduser) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "message id incorrect",
          false
        );
      }

      const message = founduser.messages.find((m) => m.id === messageId);
      if (!message) {
        return new CustomResponse(
          HttpStatusCode.BadRequest,
          "message id incorrect",
          false
        );
      }

      if (!message.isOpened) {
        await prisma.message.update({
          where: {
            id: message.id,
          },
          data: {
            isOpened: true,
          },
        });
      }

      return new CustomResponse(
        HttpStatusCode.Ok,
        "message retieved",
        true,
        message
      );
    } catch (error: unknown) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error instanceof Error ? error?.message : (error as string),
        false
      );
    }
  }
}
