import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from 'src/user/guard/user.guard';
import { UserRequest } from 'src/user/model/user-request';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { LoginUserAuthDto, RegisterUserAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginUserAuthDto) {
    return this.authService.login(body);
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

  @UseGuards(UserGuard)
  @Get('me')
  async me(@Request() req: UserRequest) {
    return req.user;
  }
}
