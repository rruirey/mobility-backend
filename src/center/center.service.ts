import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCenterDto, UpdateCenterDto } from './dto';
import { Center } from './schema/center.schema';

@Injectable()
export class CenterService {
  constructor(@InjectModel(Center.name) private centerModel: Model<Center>) {}

  async create(center: CreateCenterDto): Promise<Center> {
    const newCenter = new this.centerModel(center);
    return newCenter.save();
  }

  async findAll(): Promise<Center[]> {
    return this.centerModel.find().exec();
  }

  async findOne(id: string): Promise<Center | null> {
    return this.centerModel.findById(id);
  }

  async update(id: string, center: UpdateCenterDto): Promise<Center | null> {
    return this.centerModel.findByIdAndUpdate(id, center, {
      new: true,
    });
  }

  async delete(id: string): Promise<Center | null> {
    return this.centerModel.findByIdAndDelete(id);
  }
}
