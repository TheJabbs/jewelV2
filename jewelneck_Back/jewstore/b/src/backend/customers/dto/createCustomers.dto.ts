import { IsEmail, IsPhoneNumber, IsString, IsStrongPassword } from 'class-validator';

export class CreateCustomersDto{
  @IsEmail()
  @IsString()
  email: string;

  @IsStrongPassword()
  @IsString()
  pass: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  username: string;
}