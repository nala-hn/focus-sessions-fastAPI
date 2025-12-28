import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, } from 'typeorm';
import { FocusSession } from '../focus/focus.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'hashed_password' })
  password: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => FocusSession, (session) => session.owner)
  focusSessions: FocusSession[];
}
