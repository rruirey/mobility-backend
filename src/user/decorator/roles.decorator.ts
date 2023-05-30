import { SetMetadata, applyDecorators } from '@nestjs/common';
import { Role } from '../model/role.enum';
import { UserRequired } from './user-required.decorator';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) =>
  applyDecorators(UserRequired(), SetMetadata(ROLES_KEY, roles));
