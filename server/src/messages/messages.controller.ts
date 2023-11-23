import { CustomResponse, HttpStatusCode } from "../utils";
import { prisma } from "../../prisma";
import { encryptText } from "../services/encryption.service";
import { MessageDTO } from "./message.utils";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
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
      const savedMessage = await prisma.message.create({
        data: {
          content: encryptedMessage,
          reciepientId: id,
        },
      });
      return new CustomResponse(
        HttpStatusCode.Created,
        "Message sent succesfully",
        savedMessage
      );
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message
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

      return new CustomResponse(HttpStatusCode.Ok, "all messages retrieved", d);
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message
      );
    }
  }

  public async getUserId(
    username: string
  ): Promise<CustomResponse<string | Error>> {
    try {
      if (!username.trim()) {
        return new CustomResponse(HttpStatusCode.BadRequest, "Pass username");
      }
      const founduser = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      if (!founduser) {
        return new CustomResponse(404, "Username not found");
      }

      return new CustomResponse(HttpStatusCode.Ok, founduser.id);
    } catch (error: any) {
      return new CustomResponse(
        HttpStatusCode.InternalServerError,
        error?.message
      );
    }
  }
}
