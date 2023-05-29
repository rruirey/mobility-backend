import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() { email, password }: LoginUserDto) {
    return this.authService.login(email, password);
  }

  @Post('signup')
  singup() {
    return this.authService.singup();
  }
}
