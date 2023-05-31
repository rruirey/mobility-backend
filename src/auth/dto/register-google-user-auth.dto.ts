import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterGoogleUserAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  image?: string;
}
