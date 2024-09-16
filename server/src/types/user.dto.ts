import { IsDate, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  insurance: string;

  @IsDate()
  birthday: Date;

  @IsString()
  address: string;
}
