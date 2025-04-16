import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import createUserDto from '@app/user/dto/createuserDto';
import { userEntity } from '@app/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { userResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/LoginUserDto';
import { compare} from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>) {
  }
  async createUser(createUserDto: createUserDto) {
    const userByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const userByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if(userByUsername || userByEmail) {
      throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const newUser = new userEntity();
    Object.assign(newUser, createUserDto);

    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: LoginUserDto): Promise<userEntity> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    select: ['id', 'email', 'password', 'bio', 'image']
    });
    if(!user) {
      throw new HttpException('no user found', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const isPasswordCorrect = compare(loginUserDto.password, user.password);
    if(!isPasswordCorrect) {
      throw new HttpException('Invalid password', HttpStatus.UNPROCESSABLE_ENTITY);
    }
     delete user.password;
    return user;
  }

    findById(id: number): Promise<userEntity | null > {
    return this.userRepository.findOne({ where: {id}})
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
