import { Controller, Post, Body, Get, Query, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { FocusService } from './focus.service';
import { FocusSessionCreateDto } from './dto/focus-session-create.dto';
import { FocusSessionResponseDto } from './dto/focus-session-response.dto';
import { StandardResponseDto, PaginatedResponseDto } from '../common/dto';

// Note: ownerId seharusnya diambil dari JWT, di sini sementara hardcode/demo
const DEMO_OWNER_ID = 1;

@Controller('sessions')
export class FocusController {
  constructor(private readonly focusService: FocusService) {}

  @Post('insert')
  async create(@Body() data: FocusSessionCreateDto): Promise<StandardResponseDto<FocusSessionResponseDto>> {
    const session = await this.focusService.create(data, DEMO_OWNER_ID);
    return {
      code: 201,
      result: 'Sukses',
      detail: 'Session successfully created.',
      data: session,
    };
  }

  @Get('browse')
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 9,
  ): Promise<StandardResponseDto<PaginatedResponseDto<FocusSessionResponseDto>>> {
    const paginated = await this.focusService.findAll(DEMO_OWNER_ID, Number(page), Number(limit));
    return {
      code: 200,
      result: 'Sukses',
      detail: 'List sessions.',
      data: paginated,
    };
  }

  @Put('update/:id/stop')
  async stopSession(@Param('id') id: number): Promise<StandardResponseDto<FocusSessionResponseDto>> {
    const session = await this.focusService.stopSession(Number(id), DEMO_OWNER_ID);
    return {
      code: 200,
      result: 'Sukses',
      detail: 'Session stopped.',
      data: session,
    };
  }

  @Delete('delete/:id')
  @HttpCode(200)
  async remove(@Param('id') id: number): Promise<StandardResponseDto<null>> {
    await this.focusService.remove(Number(id), DEMO_OWNER_ID);
    return {
      code: 200,
      result: 'Sukses',
      detail: 'Session deleted.',
      data: null,
    };
  }
}
