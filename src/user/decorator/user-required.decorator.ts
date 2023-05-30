import { SetMetadata } from '@nestjs/common';

export const USER_REQUIRED_KEY = 'userRequired';
export const UserRequired = () => SetMetadata(USER_REQUIRED_KEY, true);
