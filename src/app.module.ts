import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CenterModule } from './center/center.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    CenterModule,
    MongooseModule.forRoot(process.env.DATABASE_URL || ''),
  ],
  providers: [],
})
export class AppModule {}
