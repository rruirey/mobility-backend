import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTripDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  start?: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  end?: Date;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  code?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  manager?: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsOptional()
  blockedUsers?: string[];
}
