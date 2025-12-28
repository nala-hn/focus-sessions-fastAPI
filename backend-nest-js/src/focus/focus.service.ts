import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FocusSession } from './focus.entity';
import { Category } from '../categories/category.entity';
import { FocusSessionCreateDto } from './dto/focus-session-create.dto';
import { FocusSessionResponseDto } from './dto/focus-session-response.dto';
import { PaginatedResponseDto } from '../common/dto/standard-response.dto';

@Injectable()
export class FocusService {
  constructor(
    @InjectRepository(FocusSession)
    private readonly focusRepo: Repository<FocusSession>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(data: FocusSessionCreateDto, ownerId: number): Promise<FocusSessionResponseDto> {
    const category = await this.categoryRepo.findOneBy({ id: data.category_id });
    if (!category) throw new NotFoundException('Category not found');
    const session = this.focusRepo.create({
      title: data.title,
      category_id: data.category_id,
      start_time: new Date(),
      owner: { id: ownerId } as any,
    });
    await this.focusRepo.save(session);
    // Ambil session lengkap dengan relasi
    const fullSession = await this.focusRepo.findOne({
      where: { id: session.id },
      relations: ['category'],
    });
    if (!fullSession) throw new NotFoundException('Session not found after creation');
    return {
      id: fullSession.id,
      title: fullSession.title,
      start_time: fullSession.start_time,
      end_time: fullSession.end_time ?? undefined,
      duration_minutes: fullSession.duration_minutes,
      category: fullSession.category,
    };
  }

  async findAll(ownerId: number, page = 1, limit = 9): Promise<PaginatedResponseDto<FocusSessionResponseDto>> {
    const [sessions, total] = await this.focusRepo.findAndCount({
      where: { owner: { id: ownerId } },
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
      order: { id: 'DESC' },
    });
    const list = sessions.map((s) => ({
      id: s.id,
      title: s.title,
      start_time: s.start_time,
      end_time: s.end_time ?? undefined,
      duration_minutes: s.duration_minutes,
      category: s.category,
    }));
    return { page, limit, total, list };
  }

  async stopSession(sessionId: number, ownerId: number): Promise<FocusSessionResponseDto> {
    const session = await this.focusRepo.findOne({
      where: { id: sessionId, owner: { id: ownerId } },
      relations: ['category'],
    });
    if (!session) throw new NotFoundException('Session not found');
    if (session.end_time) {
      return {
        id: session.id,
        title: session.title,
        start_time: session.start_time,
        end_time: session.end_time ?? undefined,
        duration_minutes: session.duration_minutes,
        category: session.category,
      };
    }
    session.end_time = new Date();
    session.duration_minutes = Math.floor((session.end_time.getTime() - session.start_time.getTime()) / 60000);
    await this.focusRepo.save(session);
    return {
      id: session.id,
      title: session.title,
      start_time: session.start_time,
      end_time: session.end_time ?? undefined,
      duration_minutes: session.duration_minutes,
      category: session.category,
    };
  }

  async remove(sessionId: number, ownerId: number): Promise<void> {
    // Hapus hanya jika session milik ownerId
    const session = await this.focusRepo.findOne({
      where: { id: sessionId, owner: { id: ownerId } },
    });
    if (!session) throw new NotFoundException('Session not found');
    await this.focusRepo.remove(session);
  }
}
