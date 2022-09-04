import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { TodoModule } from './features/todo/todo.module';
// import { PrismaModule } from './features/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './features/prisma/prisma.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TodoModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
