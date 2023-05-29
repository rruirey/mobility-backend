import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(email: string) {
    return {
      email,
    };
  }
}
