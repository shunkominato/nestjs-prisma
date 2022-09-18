import { Module } from '@nestjs/common';
import { PrismaModule } from '../../service/prisma/prisma.module';
// import { PrismaModule } from 'src/features/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
