import { IsString } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;

  @IsString()
  specialization: string;
}
