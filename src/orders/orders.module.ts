import { BadRequestException, Module } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from 'src/tickets/ticket.entity';
import { request } from 'express';
import { CreateOrderDTO } from './dto/create-order-dto';
import { UserOrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderTicket } from './order-ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Order, OrderTicket])],
  controllers: [UserOrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
