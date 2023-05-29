import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto, UpdateCenterDto } from './dto';

@Controller('center')
export class CenterController {
  constructor(private centerService: CenterService) {}

  @Get()
  async findAll() {
    return this.centerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const center = await this.centerService.findOne(id);
    if (!center) {
      throw new NotFoundException('Center does not exist!');
    }
    return center;
  }

  @Post()
  async create(@Body() body: CreateCenterDto) {
    try {
      return await this.centerService.create(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Center already exists');
      }
      throw error;
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateCenterDto) {
    const center = await this.centerService.update(id, body);
    if (!center) {
      throw new NotFoundException('Center does not exist!');
    }
    return center;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const center = await this.centerService.delete(id);
    if (!center) {
      throw new NotFoundException('Center does not exist!');
    }
    return center;
  }
}
