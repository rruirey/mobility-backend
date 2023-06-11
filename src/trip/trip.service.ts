import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateTripDto, UpdateTripDto } from './dto';
import { Trip } from './schema/trip.schema';

@Injectable()
export class TripService {
  constructor(@InjectModel(Trip.name) private model: Model<Trip>) {}

  async create(trip: CreateTripDto): Promise<Trip> {
    const newtrip = new this.model({
      ...trip,
      code: uuidv4().slice(0, 8),
    });
    return newtrip.save();
  }

  async findAll(): Promise<Trip[]> {
    return this.model.find();
  }

  async findByManager(manager: string): Promise<Trip[]> {
    return this.model.find({ manager });
  }

  async findByUserId(id: string): Promise<Trip[]> {
    return this.model.find({ user: id });
  }

  async findOne(id: string): Promise<Trip | null> {
    return this.model.findById(id);
  }

  async update(id: string, trip: UpdateTripDto): Promise<Trip | null> {
    return this.model.findByIdAndUpdate(id, trip, {
      new: true,
    });
  }

  async delete(id: string): Promise<Trip | null> {
    return this.model.findByIdAndDelete(id);
  }
}
