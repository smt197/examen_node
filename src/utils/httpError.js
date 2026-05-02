export default class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  

  sendError(res, error) {
    res.status(this.statusCode).json({ message: this.message });
  }
}