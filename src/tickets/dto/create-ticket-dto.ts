import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTicketDTO {
  @IsString()
  @IsNotEmpty()
  readonly event;

  @IsNotEmpty()
  @IsString()
  readonly type;

  @IsNotEmpty()
  @IsDateString()
  readonly available: Date;

  @IsNotEmpty()
  @IsDateString()
  readonly expiresAt: Date;


}
