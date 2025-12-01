// create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDTO {
  @ApiProperty({ example: 'Music Concert', description: 'Name of the event' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'An exciting music concert featuring popular bands.', description: 'Description of the event' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ example: '2024-12-31T20:00:00Z', description: 'Date and time of the event' })
  @IsDateString()
  @IsNotEmpty()
  readonly eventDate: Date;
}
