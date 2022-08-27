import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { Request } from 'express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import Fastify, { FastifyRequest } from 'fastify';
// import { fastifyHelmet } from 'fastify-helmet';
import { fastifyCookie } from '@fastify/cookie';
import fastifyCsrf from '@fastify/csrf-protection';

const fastifyInstance = Fastify({
  // logger: { level: 'info' },
});

fastifyInstance.decorateRequest('user', null);

async function bootstrap() {
  // server.addHook('preValidation', (request, reply, done) => {
  //   if (!request.query) {
  //     done();
  //     return;
  //   }

  //   const newQuery = {} as any;

  //   const regex = /([^[]+)\[\]/;

  //   Object.keys(request.query).forEach((key) => {
  //     const result = key.match(regex);

  //     if (!result) {
  //       newQuery[key] = request.query[key];
  //       return;
  //     }

  //     const arrayKey = result[1];

  //     newQuery[arrayKey] = Array.isArray(request.query[key])
  //       ? request.query[key]
  //       : [request.query[key]];
  //   });

  //   request.query = newQuery;

  //   done();
  // });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance)
  );
  // await app.register(helmet);
  await app.register(fastifyCookie);
  // await app.register(helmet);
  await app.register(fastifyCsrf, {
    cookieOpts: {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    },
    getToken: (req: FastifyRequest) => {
      console.log(req.headers['csrf-token']);
      return req.headers['csrf-token'] as string;
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    credentials: true,
    origin: [
      'http://127.0.0.1:3000',
      'https://frontend-todo-nextjs.vercel.app',
    ],
  });
  // app.use(cookieParser());
  // app.use(
  //   csurf({
  //     cookie: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       secure: true,
  //     },
  //     value: (req: Request) => {
  //       return req.header('csrf-token');
  //     },
  //   })
  // );
  await app.listen(process.env.PORT || 3005, '0.0.0.0');
}
bootstrap();
