import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order-dto';
import { Order } from './order.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
@Controller('admin/orders')
@ApiBearerAuth('JWT-auth')
export class AdminOrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAllOrders();
  }
}

@UseGuards(JwtAuthGuard)
@Roles(Role.User)
@Controller('orders')
@ApiBearerAuth('JWT-auth')
export class UserOrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  create(
    @Body() createOrderDTO: CreateOrderDTO,
    @Req() req: any,
  ): Promise<Order> {
    const userId = req.user.userId;
    console.log(userId);
    return this.ordersService.create(createOrderDTO, userId);
  }

  @Get()
  findAll(@Req() req: any): Promise<Order[]> {
    const userId = req.user.userId;
    console.log(userId);

    return this.ordersService.findUserOrders(userId);
  }

  @Get(':id')
  findOne(
    @Req() req: any,
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Order | null> {
    const userId = req.user.userId;

    return this.ordersService.findUserOneOrder(userId, id);
  }

  @Post(':orderId/cancel')
  cancelOrder(
    @Param('orderId', new ParseIntPipe())
    orderId: number,
    @Req() req: any,
  ): Promise<Order | null> {
    const userId = req.user.userId;
    console.log(userId);
    return this.ordersService.cancelOrder(orderId, userId);
  }
}
