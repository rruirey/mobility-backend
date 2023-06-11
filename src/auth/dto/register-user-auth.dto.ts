import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(4)
  @MaxLength(24)
  @IsString()
  password: string;

  @IsNotEmpty()
  name: string;
}
