import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Index('idx_tasks_priority')
  @Column({
    type: 'enum',
    enum: ['High', 'Medium', 'Low'],
  })
  priority: 'High' | 'Medium' | 'Low';

  @Index('idx_tasks_status')
  @Column({
    type: 'enum',
    enum: ['Todo', 'In Progress', 'Completed'],
  })
  status: 'Todo' | 'In Progress' | 'Completed';

  @Index('idx_tasks_due_date')
  @Column({ type: 'date' })
  dueDate: string;
}
