import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateScheineDto {
  @IsOptional()
  @IsString()
  pdfUrl?: string;

  @IsNumber()
  patientId: number;

  @IsNumber()
  doctorId: number;

  @IsNumber()
  templateId: number;

  @IsNumber()
  typeId: number;

  @IsObject()
  attributes: Record<string, string | boolean>;
}
