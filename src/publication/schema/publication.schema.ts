import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Publication {
  @Prop({
    required: true,
  })
  user: string;

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
