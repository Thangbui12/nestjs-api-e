import { userRole } from 'src/common/common.constans';

export interface IJwtPayload {
  username: string;
  email: string;
  role: userRole;
  salt: string;
}
