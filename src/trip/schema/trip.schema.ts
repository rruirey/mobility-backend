import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Trip {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: false,
  })
  description: string;

  @Prop({
    required: true,
  })
  start: Date;

  @Prop({
    required: true,
  })
  end: Date;

  @Prop({
    required: true,
  })
  code: string;

  @Prop({
    required: true,
  })
  manager: string;

  @Prop({
    required: false,
    default: [],
  })
  blockedUsers: string[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);
