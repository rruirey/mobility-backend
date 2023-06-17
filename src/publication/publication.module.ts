import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicationController } from './publication.controller';
import { PublicationService } from './publication.service';
import { Publication, PublicationSchema } from './schema/publication.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publication.name, schema: PublicationSchema },
    ]),
  ],
  providers: [PublicationService],
  controllers: [PublicationController],
  exports: [PublicationService],
})
export class PublicationModule {}
