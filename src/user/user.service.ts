import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).populate('center').select('-password');
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(id: string, user: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
