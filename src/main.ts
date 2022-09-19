import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './app/globalFilters/httpException.filter';
import { NotifyLogService } from './service/notifyLog/notifyLog.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sample REST API')
    .setDescription('REST API Tutorial in NestJS')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const configService = app.get<ConfigService>(ConfigService);
  const logService = app.get<NotifyLogService>(NotifyLogService);

  app.useGlobalFilters(new HttpExceptionFilter(configService, logService));
  app.enableCors({
    credentials: true,
    origin: [
      'http://127.0.0.1:3000',
      'https://frontend-todo-nextjs.vercel.app',
    ],
  });
  app.use(cookieParser());
  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      },
      value: (req: Request) => {
        return req.header('csrf-token');
      },
    })
  );
  await app.listen(3005, '0.0.0.0');
}
bootstrap();
