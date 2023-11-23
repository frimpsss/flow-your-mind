import { decryptText } from "../services/encryption.service";

export class MessageDTO {
  message: string;
  isOpened: boolean;
  constructor(data: {
    id: string;
    content: string;
    isOpened: boolean | null;
    reciepientId: string;
  }) {
    this.message = decryptText(data.content);
    this.isOpened = data.isOpened ?? false;
  }
}
