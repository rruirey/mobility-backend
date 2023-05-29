import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCenterDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
