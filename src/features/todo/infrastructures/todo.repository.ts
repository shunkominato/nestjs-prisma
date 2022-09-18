import { ForbiddenException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../../../service/prisma/prisma.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface ITodoRepository {
  getTasks(userId: number): Promise<Task[]>;
  getTaskById(userId: number, taskId: number): Promise<Task>;
  createTodo(userId: number, title: string, description: string): Promise<Task>;
  updateTaskById(
    taskId: number,
    title: string,
    description?: string
  ): Promise<Task>;
  deleteTaskById(taskId: number): Promise<void>;
}

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(private prisma: PrismaService) {}
  async getTasks(userId: number): Promise<Task[]> {
    const todo = await this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log(todo);
    return todo;
  }

  async getTaskById(userId: number, taskId: number): Promise<Task> {
    const todo = await this.prisma.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });
    return todo;
  }

  async createTodo(
    userId: number,
    title: string,
    description: string
  ): Promise<Task> {
    try {
      const task = await this.prisma.task.create({
        data: {
          userId,
          title,
          description,
        },
      });
      return task;
    } catch (err) {
      console.log(err);
    }
  }

  async updateTaskById(
    taskId: number,
    title: string,
    description?: string
  ): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        description,
      },
    });
  }

  async deleteTaskById(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
