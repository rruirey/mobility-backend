import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleAuthService {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async registerOAuthUser(googleUser: User): Promise<{
    access_token: string;
  }> {
    const exists = await this.userService.findByEmail(googleUser.email);
    if (exists) {
      throw new ConflictException('User with provided email already exists');
    }

    const user = await this.userService.create({
      email: googleUser.email,
      name: googleUser.name,
      password: null,
    });

    return this.authService.generateToken(user);
  }
}
