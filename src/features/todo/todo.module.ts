import { Module } from '@nestjs/common';
import { PrismaModule } from '../../service/prisma/prisma.module';
import { TodoRepositoryModule } from './infrastructures/todo.repository.module';
// import { PrismaModule } from 'src/features/prisma/prisma.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [PrismaModule, TodoRepositoryModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
