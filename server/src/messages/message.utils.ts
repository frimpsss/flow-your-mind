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

export class SingleMessageDTO {
  id: string;
  isOpened: boolean;
  message: string;
  timeStamp?: Date | null;
  constructor(data: {
    id: string;
    content: string;
    isOpened: boolean | null;
    reciepientId: string;
    createdOn: Date | null;
  }) {
    this.id = data.id;
    this.isOpened = data.isOpened ?? false;
    this.message = decryptText(data.content);
    this.timeStamp = data.createdOn;
  }
}
