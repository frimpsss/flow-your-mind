export default class CustomResponse<T> {
  statusCode: number;
  message: string;
  data: T | null;
  status: boolean;
  constructor(
    statusCode: number,
    message: string = "Operation succesful",
    status: boolean,
    data: T | null = null,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = status;
  }
}
