export default class CustomResponse<T> {
  statusCode: number;
  message: string;
  data: T | null;
  constructor(
    statusCode: number,
    message: string = "Operation succesful",
    data: T | null = null
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
