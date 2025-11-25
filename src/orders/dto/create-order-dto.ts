// create-order.dto.ts
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
