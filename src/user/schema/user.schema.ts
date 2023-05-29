import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Center } from 'src/center/schema/center.schema';
import { Role } from '../model/role';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
  })
  password: string;

  @Prop({
    type: String,
    enum: Role,
  })
  role: Role;

  @Prop({
    required: false,
  })
  center: Center;

  @Prop({
    required: false,
  })
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
