import { Controller, Post, Body, Get, Param, Put, Delete, Query, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryCreateDto, CategoryUpdateDto, CategoryResponseDto } from './dto';
import { StandardResponseDto, PaginatedResponseDto } from '../common/dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('insert')
  async create(@Body() data: CategoryCreateDto): Promise<StandardResponseDto<CategoryResponseDto>> {
    const category = await this.categoriesService.create(data);
    return {
      code: 201,
      result: 'Sukses',
      detail: 'Category successfully created.',
      data: category,
    };
  }

  @Get('browse')
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<StandardResponseDto<PaginatedResponseDto<CategoryResponseDto>>> {
    const paginated = await this.categoriesService.findAll(Number(page), Number(limit));
    return {
      code: 200,
      result: 'Sukses',
      detail: 'List categories.',
      data: paginated,
    };
  }

  @Get('detail/:id')
  async findOne(@Param('id') id: number): Promise<StandardResponseDto<CategoryResponseDto>> {
    const category = await this.categoriesService.findOne(Number(id));
    return {
      code: 200,
      result: 'Sukses',
      detail: 'Category detail.',
      data: category,
    };
  }

  @Put('update/:id')
  async update(
    @Param('id') id: number,
    @Body() data: CategoryUpdateDto,
  ): Promise<StandardResponseDto<CategoryResponseDto>> {
    const category = await this.categoriesService.update(Number(id), data);
    return {
      code: 200,
      result: 'Sukses',
      detail: 'Category updated.',
      data: category,
    };
  }

  @Delete('detele/:id')
  @HttpCode(200)
  async remove(@Param('id') id: number): Promise<StandardResponseDto<null>> {
    await this.categoriesService.remove(Number(id));
    return {
      code: 200,
      result: 'Sukses',
      detail: 'Category deleted.',
      data: null,
    };
  }
}
