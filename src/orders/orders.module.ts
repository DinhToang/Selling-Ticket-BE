import { BadRequestException, Module } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from 'src/tickets/ticket.entity';
import { request } from 'express';
import { CreateOrderDTO } from './dto/create-order-dto';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Order])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class OrdersModule {}
