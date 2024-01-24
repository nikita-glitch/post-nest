import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { ValidationError } from "yup";

@Catch()
export class custonExceptionFilter implements ExceptionFilter {
  
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getRequest();
    const res = context.getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message
      return res.status(status).json({message})
    }
    
    if (exception instanceof ValidationError) {
      return res.status(400).json({message: exception.errors})
    }

    if (exception instanceof JsonWebTokenError || exception instanceof TokenExpiredError) {
      console.log(exception);
      return res.status(401).json({message: exception.message})
    }
    
    console.log(exception);
    
  }
}