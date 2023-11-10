export default class CustomResponse<T> {
  statusCode: number;
  message: string;
  data: T | undefined;
  constructor(
    statusCode: number,
    message: string = "Operation succesful",
    data: T | undefined = undefined
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
