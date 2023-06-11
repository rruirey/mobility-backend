import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Roles } from 'src/user/decorator/roles.decorator';
import { UserRequired } from 'src/user/decorator/user-required.decorator';
import { Role, UserRequest } from 'src/user/model';
import { CreateTripDto } from './dto';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  @Roles(Role.Admin)
  async findAll() {
    return this.tripService.findAll();
  }

  @UserRequired()
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() { user }: UserRequest) {
    const trip = await this.tripService.findOne(id);
    if (!trip) {
      throw new NotFoundException('Viaje no encontrado');
    }
    if (trip.manager !== user.id) {
      throw new UnauthorizedException();
    }
    return trip;
  }

  @Get('manager/:id')
  @Roles(Role.Teacher, Role.Admin)
  async findByManager(@Param('id') id: string) {
    const trips = this.tripService.findByManager(id);
    if (!trips) {
      throw new NotFoundException('Viajes no encontrados');
    }
    return trips;
  }

  @Post()
  @Roles(Role.Teacher, Role.Admin)
  async create(@Body() body: CreateTripDto, @Request() { user }: UserRequest) {
    if (!body.manager) {
      body.manager = user.id;
    }
    try {
      return this.tripService.create(body);
    } catch (error) {
      throw error;
    }
  }
}
