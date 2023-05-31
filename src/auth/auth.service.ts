import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { RegisterUserAuthDto } from './dto/register-user-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.password) {
      throw new NotAcceptableException('User has no password');
    }

    const isMatch = await compare(password, user.password);
    return isMatch ? user : null;
  }

  async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async singUp(user: RegisterUserAuthDto) {
    const { password } = user;

    const hasedPassword = await hash(password, 10);
    user = { ...user, password: hasedPassword };

    return this.userService.create(user);
  }
}
