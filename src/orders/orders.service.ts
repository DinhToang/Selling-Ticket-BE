import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { Ticket } from 'src/tickets/ticket.entity';
import { CreateOrderDTO } from './dto/create-order-dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
  ) {}

  async create(createOrderDTO: CreateOrderDTO, userId: number): Promise<Order> {
    const { ticketIds } = createOrderDTO;
    const tickets = await this.ticketRepo.findByIds(ticketIds);
    for (const ticket of tickets) {
      if (ticket.orderId !== null) {
        throw new BadRequestException(
          `Ticket ID ${ticket.id} đã được đặt bởi đơn hàng khác`,
        );
      }
    }
    const order = new Order();
    order.userId = userId;
    await this.orderRepo.save(order);
    tickets.forEach((ticket) => {
      ticket.orderId = order.id;
    });
    console.log(tickets);
    await this.ticketRepo.save(tickets);
    return order;
  }
}
