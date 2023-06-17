import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationModule } from 'src/publication/publication.module';
import { Trip, TripSchema } from './schema/trip.schema';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    PublicationModule,
  ],
  providers: [TripService],
  controllers: [TripController],
  exports: [TripService],
})
export class TripModule {}
