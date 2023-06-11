import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRequired } from 'src/user/decorator/user-required.decorator';
import { UserRequest } from 'src/user/model';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { RegisterUserAuthDto } from './dto';
import { GoogleAuthService } from './google/google-auth.service';
import { GoogleOAuthGuard } from './guard/google-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }: UserRequest) {
    return this.authService.generateToken(user);
  }

  @Public()
  @Post('signup')
  async singUp(@Body() body: RegisterUserAuthDto) {
    try {
      await this.authService.singUp(body);
      return { message: 'Te has registrado con éxito.' };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('El email ya está en uso.');
      }
      throw error;
    }
  }

  @UserRequired()
  @Get('me')
  async me(@Request() { user }: UserRequest) {
    return user;
  }

  // Google OAuth

  @Public()
  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() { user }: UserRequest) {
    return this.googleAuthService.validateOAuthLogin(user);
  }
}
