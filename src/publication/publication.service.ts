import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePublicationDto, UpdatePublicationDto } from './dto';
import { Publication } from './schema/publication.schema';

@Injectable()
export class PublicationService {
  constructor(
    @InjectModel(Publication.name) private model: Model<Publication>,
  ) {}

  async create(publication: CreatePublicationDto): Promise<Publication> {
    const newpublication = new this.model(publication);
    return newpublication.save();
  }

  async findAll(): Promise<Publication[]> {
    return this.model.find();
  }

  async findByUserId(id: string): Promise<Publication[]> {
    return this.model.find({ user: id }).sort({ createdAt: -1 });
  }

  async findByTripId(id: string): Promise<Publication[]> {
    return this.model
      .find({ trip: id })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
  }

  async findByUserAndTripId(
    user: string,
    trip: string,
  ): Promise<Publication[]> {
    return this.model.find({ user, trip });
  }

  async findOne(id: string): Promise<Publication | null> {
    return this.model.findById(id);
  }

  async update(
    id: string,
    publication: UpdatePublicationDto,
  ): Promise<Publication | null> {
    return this.model.findByIdAndUpdate(id, publication, {
      new: true,
    });
  }

  async delete(id: string): Promise<Publication | null> {
    return this.model.findByIdAndDelete(id);
  }
}
