import { Task } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { CreateTaskDto } from '../dto/create-task.dto';
import { todoReadModel } from './todo.read.model';
import { todoWriteModel } from './todo.write.model';

export const getFactory = (todo: Task) => {
  return plainToClass(todoReadModel, {
    id: todo.id,
    title: todo.title,
    description: todo.description,
    userId: todo.userId,
  });
};

export const createFactory = (userId: number, dto: CreateTaskDto) => {
  return plainToClass(todoWriteModel, {
    title: dto.title,
    description: dto.description,
    userId,
  });
};
