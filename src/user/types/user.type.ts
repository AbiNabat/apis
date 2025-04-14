import { userEntity } from '@app/user/user.entity';

export type UserType = Omit<userEntity, 'hashPassword'>;