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
      throw new NotFoundException('El usuario no se ha podido encontrar');
    }

    if (!user.password) {
      throw new NotAcceptableException('El usuario no tiene contraseña');
    }

    const isMatch = await compare(password, user.password);
    return isMatch ? user : null;
  }

  async singUp(registerUser: RegisterUserAuthDto) {
    const { password } = registerUser;

    const hasedPassword = await hash(password, 10);
    registerUser = { ...registerUser, password: hasedPassword };

    return await this.userService.create(registerUser);
  }

  async generateToken(user: User) {
    const payload = { id: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
