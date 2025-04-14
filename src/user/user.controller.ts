import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import createUserDto from '@app/user/dto/createuserDto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  async createUser(@Body('user') createUserDto: createUserDto): Promise<any> {
    return this.userService.createUser(createUserDto);
  }
}
