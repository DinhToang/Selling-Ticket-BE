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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Roles(Role.Admin)
@Controller('admin/orders')
@ApiBearerAuth('JWT-auth')
export class AdminOrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders (For Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will return all users orders.',
    })
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
  @ApiOperation({ summary: 'Create a new order (For User only)' })
  @ApiResponse({
    status: 201,
    description: 'It will create a new order for the logged-in user.',  })
  create(
    @Body() createOrderDTO: CreateOrderDTO,
    @Req() req: any,
  ): Promise<Order> {
    const userId = req.user.userId;
    console.log(userId);
    return this.ordersService.create(createOrderDTO, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders of the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'It will return all orders of the logged-in user.',  })
  findAll(@Req() req: any): Promise<Order[]> {
    const userId = req.user.userId;
    console.log(userId);

    return this.ordersService.findUserOrders(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific order by ID for the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'It will return the order with the specified ID for the logged-in user.',  })
  findOne(
    @Req() req: any,
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Order | null> {
    const userId = req.user.userId;

    return this.ordersService.findUserOneOrder(userId, id);
  }

  @Post(':orderId/cancel')
  @ApiOperation({ summary: 'Cancel an order by ID for the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'It will cancel the order with the specified ID for the logged-in user.',  })
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
