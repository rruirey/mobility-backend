import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Center } from 'src/center/schema/center.schema';
import { Role } from '../model/role.enum';
export class UpdateUserDto {
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  role?: Role;

  @IsOptional()
  center?: Center;

  @IsOptional()
  @IsString()
  token?: string;
}
