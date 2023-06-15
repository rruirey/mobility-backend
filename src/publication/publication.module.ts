import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripModule } from 'src/trip/trip.module';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { Publication, PublicationSchema } from './schema/publication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema },
    ]),
    TripModule,
  ],
  providers: [PublicationService],
  controllers: [PublicationController],
})
export class PublicationModule {}
