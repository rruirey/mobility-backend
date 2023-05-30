import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginUserAuthDto } from './dto';
import { RegisterUserAuthDto } from './dto/register-user-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserAuthDto) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async singUp(user: RegisterUserAuthDto) {
    const { password } = user;

    const hasedPassword = await hash(password, 10);
    user = { ...user, password: hasedPassword };

    return this.userService.create(user);
  }
}
