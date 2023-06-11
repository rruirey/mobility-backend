import { UserRequest } from './user-request';

export interface ResourceOwnerRequest extends UserRequest {
  params: {
    id: string;
  };
}
