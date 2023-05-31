import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Center } from 'src/center/schema/center.schema';
import { Role } from '../model/role.enum';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string | null;

  @IsOptional()
  role?: Role;

  @IsOptional()
  center?: Center;

  @IsOptional()
  @IsString()
  token?: string;
}
