import { JwtAuthPayload } from './jwt-auth-payload';

export class JwtPayloadRequest extends Request {
  user: JwtAuthPayload;
}
