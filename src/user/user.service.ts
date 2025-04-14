import { Injectable } from '@nestjs/common';
import createUserDto from '@app/user/dto/createuserDto';
import { userEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>) {
  }
  async createUser(createUserDto: createUserDto) {
    const newUser = new userEntity();
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }
}
