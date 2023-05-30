import { IsNotEmpty } from 'class-validator';
import { LoginUserAuthDto } from './login-user-auth.dto';

export class RegisterUserAuthDto extends LoginUserAuthDto {
  @IsNotEmpty()
  name: string;
}
