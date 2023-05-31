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
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
      return await this.authService.singUp(body);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User with provided email already exists');
      }
      throw error;
    }
  }

  @UserRequired()
  @Get('me')
  async me(@Request() { user }: UserRequest) {
    return user;
  }
}
