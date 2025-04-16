import { IsEmail, IsNotEmpty } from 'class-validator';

export default class createUserDto {
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}