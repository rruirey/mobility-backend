import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CenterModule } from './center/center.module';
import { PublicationModule } from './publication/publication.module';
import { UserModule } from './user/user.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL || ''),
    AuthModule,
    UserModule,
    CenterModule,
    PublicationModule,
    TripModule,
  ],
  providers: [],
})
export class AppModule {}
