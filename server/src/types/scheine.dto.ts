import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateScheineDto {
  @IsObject()
  attributes: { [key: string]: string };

  @IsOptional()
  @IsString()
  pdfUrl?: string;

  @IsObject()
  patient: { id: number };

  @IsObject()
  doctor: { id: number };

  @IsObject()
  template: { id: number };

  @IsObject()
  type: { id: number };
}
