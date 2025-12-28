import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from '../users/user.entity';
import { FocusSession } from '../focus/focus.entity';
import { Category } from '../categories/category.entity';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,

  // 🔒 SAFETY FIRST
  synchronize: false,
  migrationsRun: false,
  dropSchema: false,

  // logging boleh nyala pas dev
  logging: true,

  // entity akan kita isi di step berikutnya
  entities: [User, FocusSession, Category],
};
