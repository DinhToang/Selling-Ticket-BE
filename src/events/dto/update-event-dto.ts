// create-order.dto.ts
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEventDTO {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsDateString()
  @IsOptional()
  readonly eventDate: Date;
}
