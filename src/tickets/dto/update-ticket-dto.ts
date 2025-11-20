import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTicketDTO {
  @IsString()
  @IsOptional()
  readonly event: string;

  @IsOptional()
  @IsString()
  readonly type: string;

  @IsDateString()
  @IsOptional()
  readonly available: Date;

  @IsDateString()
  @IsOptional()
  readonly expiresAt: Date;
}
