import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import createUserDto from '@app/user/dto/createuserDto';
import { userResponseInterface } from '@app/user/types/userResponse.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('users')
  async createUser(@Body('user') createUserDto: createUserDto): Promise<userResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }
}
