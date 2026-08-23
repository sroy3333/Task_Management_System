import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import {
  TaskPriority,
  TaskStatus,
} from './dto/create-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let repository: jest.Mocked<Repository<Task>>;

  const mockTasks: Task[] = [
    {
      id: 3,
      title: 'Maintain Project Requirements',
      priority: TaskPriority.High,
      status: TaskStatus.Todo,
      dueDate: '2026-09-12',
    },
    {
      id: 4,
      title: 'Learn NestJS Persistence',
      priority: TaskPriority.Low,
      status: TaskStatus.Completed,
      dueDate: '2026-08-20',
    },
  ];

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<Repository<Task>>;

    service = new TasksService(repository);
  });

  describe('getTasks', () => {
    it('returns all tasks ordered by id ascending', async () => {
      repository.find.mockResolvedValue(mockTasks);

      const result = await service.getTasks();

      expect(repository.find).toHaveBeenCalledWith({
        order: {
          id: 'ASC',
        },
      });

      expect(result).toEqual(mockTasks);
    });
  });

  describe('getTask', () => {
    it('returns a task when it exists', async () => {
      repository.findOne.mockResolvedValue(mockTasks[0]);

      const result = await service.getTask(3);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id: 3,
        },
      });

      expect(result).toEqual(mockTasks[0]);
    });

    it('throws NotFoundException when the task does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.getTask(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTask', () => {
    it('creates and saves a task', async () => {
      const taskData = {
        title: '  Test task  ',
        priority: TaskPriority.Low,
        status: TaskStatus.Todo,
        dueDate: '2026-09-30',
      };

      const createdTask = {
        id: 8,
        title: 'Test task',
        priority: TaskPriority.Low,
        status: TaskStatus.Todo,
        dueDate: '2026-09-30',
      } as Task;

      repository.create.mockReturnValue(createdTask);
      repository.save.mockResolvedValue(createdTask);

      const result = await service.createTask(taskData);

      expect(repository.create).toHaveBeenCalledWith({
        title: 'Test task',
        priority: TaskPriority.Low,
        status: TaskStatus.Todo,
        dueDate: '2026-09-30',
      });

      expect(repository.save).toHaveBeenCalledWith(createdTask);

      expect(result).toEqual(createdTask);
    });
  });

  describe('updateTask', () => {
    it('updates and saves an existing task', async () => {
      const existingTask = {
        id: 3,
        title: 'Maintain Project Requirements',
        priority: TaskPriority.High,
        status: TaskStatus.Todo,
        dueDate: '2026-09-12',
      } as Task;

      repository.findOne.mockResolvedValue(existingTask);

      repository.save.mockImplementation(
        async (task) => task as Task,
      );

      const result = await service.updateTask(3, {
        title: '  Updated task  ',
        priority: TaskPriority.Medium,
        status: TaskStatus.InProgress,
        dueDate: '2026-10-01',
      });

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id: 3,
        },
      });

      expect(existingTask).toEqual({
        id: 3,
        title: 'Updated task',
        priority: TaskPriority.Medium,
        status: TaskStatus.InProgress,
        dueDate: '2026-10-01',
      });

      expect(repository.save).toHaveBeenCalledWith(existingTask);

      expect(result).toEqual(existingTask);
    });

    it('throws NotFoundException when updating a missing task', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.updateTask(999, {
          title: 'Updated task',
          priority: TaskPriority.Medium,
          status: TaskStatus.InProgress,
          dueDate: '2026-10-01',
        }),
      ).rejects.toThrow(NotFoundException);

      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('deleteTask', () => {
    it('removes and returns an existing task', async () => {
      const existingTask = {
        id: 3,
        title: 'Maintain Project Requirements',
        priority: TaskPriority.High,
        status: TaskStatus.Todo,
        dueDate: '2026-09-12',
      } as Task;

      repository.findOne.mockResolvedValue(existingTask);
      repository.remove.mockResolvedValue(existingTask);

      const result = await service.deleteTask(3);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          id: 3,
        },
      });

      expect(repository.remove).toHaveBeenCalledWith(existingTask);

      expect(result).toEqual(existingTask);
    });

    it('throws NotFoundException when deleting a missing task', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.deleteTask(999),
      ).rejects.toThrow(NotFoundException);

      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
