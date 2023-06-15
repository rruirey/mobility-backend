import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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

  @UserRequired()
  @Get('join/:code')
  async join(@Param('code') code: string, @Request() { user }: UserRequest) {
    code = code.trim();

    const trip = await this.tripService.findOneByCode(code);

    if (!trip) {
      throw new NotFoundException(
        'No se ha encontrado ningun viaje con el código indicado',
      );
    }

    if (trip.users.includes(user.id)) {
      throw new ForbiddenException('Ya estás apuntado a este viaje');
    }

    trip.users.push(user.id);
    await this.tripService.update(trip.id, trip);

    return { message: 'Te has apuntado al viaje correctamente' };
  }

  @UserRequired()
  @Get('leave/:code')
  async leave(@Param('code') code: string, @Request() { user }: UserRequest) {
    const trip = await this.tripService.findOneByCode(code);
    if (!trip) {
      throw new NotFoundException(
        'No se ha encontrado ningun viaje con el código indicado',
      );
    }

    const index = trip.users.indexOf(user.id);
    if (index === -1) {
      throw new ForbiddenException('No estás apuntado a este viaje');
    }

    trip.users.splice(index, 1);
    await this.tripService.update(trip.id, trip);
    return { message: 'Has salido del viaje correctamente' };
  }

  @Get('manager/:id')
  @Roles(Role.Manager, Role.Admin)
  async findByManager(@Param('id') id: string) {
    const trips = await this.tripService.findByManager(id);
    if (!trips) {
      throw new NotFoundException(
        'No se han encontrado viajes para el usuario indicado',
      );
    }
    return trips;
  }

  @Get('user')
  @UserRequired()
  async findByUser(@Request() { user }: UserRequest) {
    const trips = await this.tripService.findByUserId(user.id);
    if (!trips) {
      throw new NotFoundException('No se han encontrado viajes próximos');
    }
    return trips;
  }

  @Get('user/upcoming')
  @UserRequired()
  async findUpcoming(@Request() { user }: UserRequest) {
    const trips = await this.tripService.findUpcomingByUserId(user.id);
    if (!trips) {
      throw new NotFoundException('No se han encontrado viajes próximos');
    }
    return trips;
  }

  @Get('user/current')
  @UserRequired()
  async findCurrent(@Request() { user }: UserRequest) {
    const trip = await this.tripService.findCurrentByUserId(user.id);
    if (!trip) {
      throw new NotFoundException(
        'No se han encontrado viajes para el usuario indicado hoy',
      );
    }
    return trip;
  }

  @Post()
  @Roles(Role.Admin, Role.Manager)
  async create(@Request() { user }: UserRequest, @Body() body: CreateTripDto) {
    try {
      return await this.tripService.create({
        ...body,
        manager: user.id,
      });
    } catch (error) {
      throw error;
    }
  }

  @UserRequired()
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() { user }: UserRequest) {
    const trip = await this.tripService.findOne(id);
    if (!trip) {
      throw new NotFoundException('Viaje no encontrada');
    }

    const roles = [Role.Admin, Role.Manager];
    if (trip.manager !== user.id || !roles.includes(user.role)) {
      throw new UnauthorizedException();
    }

    return this.tripService.delete(id);
  }
}
