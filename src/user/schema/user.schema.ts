import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Center } from 'src/center/schema/center.schema';
import { Role } from '../model/role.enum';

@Schema({
  timestamps: true,
})
export class User {
  id: string;

  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  password?: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.Student,
  })
  role: Role;

  @Prop({
    type: Types.ObjectId,
    ref: 'Center',
    required: false,
  })
  center: Center;

  @Prop({
    required: false,
  })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
