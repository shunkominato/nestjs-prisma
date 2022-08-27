import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '@nestjs/passport';
import { Task } from '@prisma/client';
// import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TodoService } from './todo.service';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getTasks(@Req() req: FastifyRequest): Promise<Task[]> {
    return this.todoService.getTasks(req.user.id);
  }

  @Get(':id')
  getTaskById(
    @Req() req: FastifyRequest,
    @Param('id', ParseIntPipe) taskId: number
  ): Promise<Task> {
    return this.todoService.getTaskById(req.user.id, taskId);
  }

  @Post()
  createTask(
    @Req() req: FastifyRequest,
    @Body() dto: CreateTaskDto
  ): Promise<Task> {
    return this.todoService.createTodo(req.user.id, dto);
  }

  @Patch(':id')
  updateTaskById(
    @Req() req: FastifyRequest,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto
  ): Promise<Task> {
    return this.todoService.updateTaskById(req.user.id, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTaskById(
    @Req() req: FastifyRequest,
    @Param('id', ParseIntPipe) taskId: number
  ): Promise<void> {
    return this.todoService.deleteTaskById(req.user.id, taskId);
  }
}
