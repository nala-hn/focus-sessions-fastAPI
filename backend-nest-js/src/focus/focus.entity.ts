import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';

@Entity({ name: 'focus_sessions' })
export class FocusSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_time: Date | null;

  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.sessions)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'int', nullable: true })
  duration_minutes?: number;

  @ManyToOne(() => User, (user) => user.focusSessions)
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
