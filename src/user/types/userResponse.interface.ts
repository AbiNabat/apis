import { UserType } from '@app/user/types/user.type';

export interface userResponseInterface {
  user: UserType & {token: string};
}