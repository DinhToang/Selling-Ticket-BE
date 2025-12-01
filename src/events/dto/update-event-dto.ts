// create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateEventDTO {
  @ApiProperty({ example: 'Music Concert', description: 'Name of the event', required: false })
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({ example: 'An exciting music concert featuring popular bands.', description: 'Description of the event', required: false })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({ example: '2024-12-31T20:00:00Z', description: 'Date and time of the event', required: false })
  @IsDateString()
  @IsOptional()
  readonly eventDate: Date;
}
