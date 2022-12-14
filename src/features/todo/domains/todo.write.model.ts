import { Task } from '@prisma/client';
import { ITodoRepository } from '../infrastructures/todo.repository';
function sleep(waitMsec: number) {
  const startMsec = new Date() as any;

  // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
  while ((new Date() as any) - startMsec < waitMsec);
}
export class todoWriteModel {
  id: number;

  title: string;

  description?: string;

  userId: number;

  async createTodo(todoRepository: ITodoRepository): Promise<Task> {
    try {
      const task = await todoRepository.createTodo(
        this.userId,
        this.title,
        this.description
      );
      return task;
    } catch (err) {
      console.log(err);
    }
  }

  async updateTodo(todoRepository: ITodoRepository): Promise<Task> {
    try {
      const task = await todoRepository.updateTaskById(
        this.id,
        this.title,
        this.description
      );
      return task;
    } catch (err) {
      console.log(err);
    }
  }
}
