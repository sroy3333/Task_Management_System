import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export enum TaskPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(TaskPriority)
  priority: TaskPriority;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsDateString()
  dueDate: string;
}
