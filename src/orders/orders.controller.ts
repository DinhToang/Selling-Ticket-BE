import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order-dto';
import { Order } from './order.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
  @Post()
  create(
    @Body() createOrderDTO: CreateOrderDTO,
    @Req() req: any,
  ): Promise<Order> {
    const userId = req.user.userId;
    console.log(userId);

    return this.ordersService.create(createOrderDTO, userId);
  }
}
