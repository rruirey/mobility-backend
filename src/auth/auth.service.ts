import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(email: string, password: string) {
    return {};
  }

  singup() {
    return {
      message: 'Signup success',
    };
  }
}
