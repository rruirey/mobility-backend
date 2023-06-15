import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Publication {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: false,
  })
  user: string;

  @Prop({
    required: true,
  })
  trip: string;

  @Prop({
    required: true,
  })
  image: string;

  @Prop({
    required: false,
  })
  description: string;

  @Prop({
    required: false,
  })
  location: string;
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
