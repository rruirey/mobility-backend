import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_REQUIRED_KEY } from '../decorator/user-required.decorator';
import { UserRequest } from '../model';
import { UserService } from '../user.service';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private userService: UserService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isUserRequired = this.reflector.getAllAndOverride<boolean>(
      USER_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!isUserRequired) {
      return true;
    }

    const request = context.switchToHttp().getRequest<UserRequest>();
    if (!request.user) {
      throw new UnauthorizedException();
    }

    const { id } = request.user;
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    request['user'] = user;
    return true;
  }
}
