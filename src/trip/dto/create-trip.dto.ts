import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTripDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  start: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  end: Date;

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
