import { decryptText } from "../services/encryption.service";

export class MessageDTO {
  id: string;
  isOpened: boolean;
  constructor(data: {
    id: string;
    content: string;
    isOpened: boolean | null;
    reciepientId: string;
  }) {
    this.id = data.id;
    this.isOpened = data.isOpened ?? false;
  }
}
