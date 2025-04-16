import { Request } from 'express';
import { userEntity } from '@app/user/user.entity';

export interface ExpressRequestInterface  extends Request{
  user?: userEntity | null;
}