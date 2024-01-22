import { Catch, HttpException, Injectable } from "@nestjs/common";
import { ErrorHandler } from "src/error/errorHandler";
import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";

@Catch()
export class errorHandlerMiddleware {
  constructor() {}
  static check(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
      return res.status(400).json({ message: err.message })
    }

    if (err instanceof ErrorHandler) {
      return res.status(err.status).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Unexpected error' })
  }
}