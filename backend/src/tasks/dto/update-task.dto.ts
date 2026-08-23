import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import {
  TaskPriority,
  TaskStatus,
} from './create-task.dto';

export class UpdateTaskDto {
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
