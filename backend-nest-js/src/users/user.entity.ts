import { Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';
import { FocusSession } from '../focus/focus.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'hashed_password' })
  password: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => FocusSession, (session) => session.owner)
  focusSessions: FocusSession[];
}
