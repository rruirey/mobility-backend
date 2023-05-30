import { AuthUser } from './auth-user';

export interface AuthUserRequest extends Request {
  user?: AuthUser;
}
