import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryCreateDto, CategoryUpdateDto } from './dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { PaginatedResponseDto } from '../common/dto/standard-response.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(data: CategoryCreateDto): Promise<CategoryResponseDto> {
    const category = this.categoryRepo.create({ ...data });
    await this.categoryRepo.save(category);
    return category;
  }

  async findAll(page = 1, limit = 10): Promise<PaginatedResponseDto<CategoryResponseDto>> {
    const [list, total] = await this.categoryRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { created_at: 'DESC' },
    });
    return { page, limit, total, list };
  }

  async findOne(id: number): Promise<CategoryResponseDto> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, data: CategoryUpdateDto): Promise<CategoryResponseDto> {
    const category = await this.categoryRepo.findOneBy({ id });
    if (!category) throw new NotFoundException('Category not found');
    Object.assign(category, data);
    await this.categoryRepo.save(category);
    return category;
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoryRepo.delete(id);
    if (!result.affected) throw new NotFoundException('Category not found');
  }
}
