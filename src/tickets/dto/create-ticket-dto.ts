import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'VIP', description: 'Type of the ticket' })
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({ example: 100, description: 'Price of the ticket' })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({ example: 50, description: 'Number of available tickets' })
  @IsNumber()
  @IsNotEmpty()
  readonly availableTicket: number;

  @ApiProperty({ example: 1, description: 'ID of the event' })
  @IsNumber()
  @IsNotEmpty()
  readonly eventId: number;
}
