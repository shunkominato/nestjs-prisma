import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ITodoRepository } from './infrastructures/todo.repository';
// import { PrismaService } from 'src/features/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
// import { ITodoRepository } from './infrastructures/todo.repository';
import { ConstantTokens } from './todo.constants';
import { createFactory } from './domains/todo.factory';

@Injectable()
export class TodoService {
  constructor(
    @Inject(ConstantTokens.REPOSITORY)
    private readonly todoRepository: ITodoRepository
  ) {}

  async getTasks(userId: number): Promise<Task[]> {
    const todo = await this.todoRepository.getTasks(userId);
    console.log(todo);
    return todo;
  }

  async getTaskById(userId: number, taskId: number): Promise<Task> {
    const todo = await this.todoRepository.getTaskById(userId, taskId);
    return todo;
  }

  async createTodo(userId: number, dto: CreateTaskDto): Promise<Task> {
    const todoWriteModel = createFactory(userId, dto);
    try {
      const todo = await todoWriteModel.createTodo(this.todoRepository);
      return todo;
    } catch (err) {
      console.log(err);
    }
  }

  async updateTaskById(
    userId: number,
    taskId: number,
    dto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.todoRepository.getTaskById(userId, taskId);

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permision to update');

    const todoWriteModel = createFactory(userId, dto);
    try {
      const todo = await todoWriteModel.updateTodo(this.todoRepository);
      return todo;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteTaskById(userId: number, taskId: number): Promise<void> {
    const task = await this.todoRepository.getTaskById(userId, taskId);

    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permision to delete');

    try {
      const todo = await this.todoRepository.deleteTaskById(task.id);
      return todo;
    } catch (err) {
      console.log(err);
    }
  }
}
