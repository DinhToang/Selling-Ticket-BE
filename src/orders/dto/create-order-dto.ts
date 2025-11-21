// create-order.dto.ts
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @Min(1, { each: true }) // ID phải >= 1
  readonly ticketIds: number[];
}