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
  readonly type: string;

  @IsNumber()
  @IsOptional()
  readonly price;

  @IsNumber()
  @IsOptional()
  readonly totalQuantity;
}
