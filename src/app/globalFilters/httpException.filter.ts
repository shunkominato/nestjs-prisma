import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Request, Response } from 'express';
import {
  NotifyLogService,
  LOG_LEVEL,
} from 'src/service/notifyLog/notifyLog.service';
import { SystemLogger } from 'src/lib/module/systemLogger';

type HttpExceptionResponseType = {
  errorMessage: string;
  logLevel: typeof LOG_LEVEL[keyof typeof LOG_LEVEL];
  logMessage: string;
  error: PrismaClientKnownRequestError | Error;
};

function sleep(waitMsec: number) {
  const startMsec = new Date() as any;

  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while ((new Date() as any) - startMsec < waitMsec);
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private config: ConfigService,
    private notifyLogger: NotifyLogService
  ) {}
  catch(Exception: HttpException, host: ArgumentsHost) {
    console.log('---------');
    console.log('exception');
    console.log(this.config.get('DATABASE_URL'));
    console.log(this.notifyLogger.error({ message: 'errordayo' }));
    const date = new Date(
      Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
    );

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const messageObj = Exception.getResponse() as HttpExceptionResponseType;
    const systemLogger = SystemLogger({
      destination: `systemLog/${year}${month}${day}_app_error.log`,
    });
    systemLogger.error(messageObj.error);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = Exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: messageObj.errorMessage,
    });
  }
}
