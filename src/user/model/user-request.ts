import { User } from '../schema/user.schema';

export interface UserRequest extends Request {
  user: User;
}
