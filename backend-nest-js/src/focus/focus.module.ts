import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FocusSession } from './focus.entity';
import { Category } from '../categories/category.entity';
import { FocusService } from './focus.service';
import { FocusController } from './focus.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FocusSession, Category])],
  controllers: [FocusController],
  providers: [FocusService],
  exports: [TypeOrmModule, FocusService],
})
export class FocusModule {}
