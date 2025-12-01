// create-order.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsPositive,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty({
    example: [
      { ticketId: 1, ticketQuantity: 2 },
    ],
    description: 'List of tickets and their quantities for the order',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[]; // dùng thẳng class con
}

// Và class con
export class OrderItemDTO {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  ticketId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  ticketQuantity: number;
}
