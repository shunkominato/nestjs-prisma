import { Module, Provider } from '@nestjs/common';
import { PrismaModule } from '../../../service/prisma/prisma.module';
import { ConstantTokens } from '../todo.constants';
import { TodoRepository, ITodoRepository } from './todo.repository';
// import { PrismaModule } from 'src/features/prisma/prisma.module';

export const TodoRepositoryProvider: Provider = {
  provide: ConstantTokens.REPOSITORY,
  useClass: TodoRepository,
};

@Module({
  imports: [PrismaModule],
  providers: [TodoRepositoryProvider],
  exports: [TodoRepositoryProvider],
})
export class TodoRepositoryModule {}
