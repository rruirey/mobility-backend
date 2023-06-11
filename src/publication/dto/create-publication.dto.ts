import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  user?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  location?: string;
}
