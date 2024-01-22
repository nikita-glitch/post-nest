import { HttpStatus, Injectable } from "@nestjs/common";
import { ErrorHandlerInterface } from "src/interfaces/Interfaces";

export class ErrorHandler extends Error implements ErrorHandlerInterface {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
  static invalidToken(message: string) {
    return new ErrorHandler(HttpStatus.BAD_REQUEST, message);
  }
  static existingEntity(message: string) {
    return new ErrorHandler(HttpStatus.BAD_REQUEST , message);
  }
  static wrongLogPass(message: string) {
    return new ErrorHandler(HttpStatus.BAD_REQUEST , message);
  }
  static forbidden(message: string) {
    return new ErrorHandler(HttpStatus.FORBIDDEN ,message);
  }
  static unautorized(message: string) {
    return new ErrorHandler(HttpStatus.UNAUTHORIZED, message);
  }
  static notFound(message: string) {
    return new ErrorHandler(HttpStatus.NOT_FOUND, message);
  }
  static emptyRequest(message: string) {
    return new ErrorHandler(HttpStatus.NOT_FOUND, message);
  }
}