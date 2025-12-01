import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTicketDTO {
  @ApiProperty({ example: 'VIP', description: 'Type of the ticket', required: false })
  @IsString()
  @IsOptional()
  readonly type: string;

  @ApiProperty({ example: 100, description: 'Price of the ticket', required: false })
  @IsNumber()
  @IsOptional()
  readonly price;

  @ApiProperty({ example: 50, description: 'Number of available tickets', required: false })
  @IsNumber()
  @IsOptional()
  readonly totalQuantity;
}
