import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getTask(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID ${id} not found`,
      );
    }

    return task;
  }

  async createTask(data: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      title: data.title.trim(),
      priority: data.priority,
      status: data.status,
      dueDate: data.dueDate,
    });

    return this.taskRepository.save(task);
  }

  async updateTask(
    id: number,
    data: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.getTask(id);

    task.title = data.title.trim();
    task.priority = data.priority;
    task.status = data.status;
    task.dueDate = data.dueDate;

    return this.taskRepository.save(task);
  }

  async deleteTask(id: number): Promise<Task> {
    const task = await this.getTask(id);

    await this.taskRepository.remove(task);

    return task;
  }
}
