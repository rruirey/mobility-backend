import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePublicationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  user?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  trip?: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
