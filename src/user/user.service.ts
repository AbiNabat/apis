import { Injectable } from '@nestjs/common';
import createUserDto from '@app/user/dto/createuserDto';
import { userEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { userResponseInterface } from '@app/user/types/userResponse.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>) {
  }
  async createUser(createUserDto: createUserDto) {
    const newUser = new userEntity();
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  generateJwt(user: userEntity): string {
    return  sign({
      id: user.id,
      username: user.username,
      email: user.email,
    }, JWT_SECRET)
  }

  buildUserResponse(user: userEntity): userResponseInterface {
   return {
     user: {
       ...user,
       token: this.generateJwt(user),
     }
   }
  }
}
