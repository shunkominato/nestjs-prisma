import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LogService } from 'src/service/logger/log.service';

type HttpExceptionResponseType = {
  errorMessage: string;
  logLevel: string;
  logMessage: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private config: ConfigService, private logger: LogService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('---------');
    console.log('exception');
    console.log(this.config.get('DATABASE_URL'));
    console.log(this.logger.error({ message: 'errordayo' }));
    console.log('---------');
    const messageObj = exception.getResponse() as HttpExceptionResponseType;
    console.log(messageObj);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
