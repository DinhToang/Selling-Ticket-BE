import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { Ticket } from 'src/tickets/ticket.entity';
import { CreateOrderDTO } from './dto/create-order-dto';
import { User } from 'src/users/user.entity';
import { OrderTicket } from './order-ticket.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,

    @InjectRepository(OrderTicket)
    private orderTicketRepo: Repository<OrderTicket>,
  ) {}

  async create(createOrderDTO: CreateOrderDTO, userId: number): Promise<Order> {
    const { items } = createOrderDTO;
    const ticketIds = items.map((i) => i.ticketId);
    const tickets = await this.ticketRepo.findByIds(ticketIds);
    const order = this.orderRepo.create({
      userId: userId,
      status: 'pending',
      total: 0,
    });
    await this.orderRepo.save(order);
    let totalAmount = 0;
    const orderTicketArr: OrderTicket[] = [];

    for (const item of items) {
      const ticket = tickets.find((t) => t.id === item.ticketId);
      if (!ticket) {
        throw new NotFoundException(
          `Loại vé này không tồn tại ${item.ticketId}`,
        );
      }
      if (ticket.availableTicket - item.ticketQuantity < 0) {
        throw new BadRequestException(
          `Vé loại ${ticket.type} chỉ còn lại ${ticket.availableTicket} vé`,
        );
      }
      totalAmount += ticket.price * item.ticketQuantity;
      ticket.availableTicket -= item.ticketQuantity;

      let duplicate = false;
      for (const orderTicketMap of orderTicketArr) {
        if (orderTicketMap.ticketId == item.ticketId) {
          orderTicketMap.quantity += item.ticketQuantity;
          duplicate = true;
          break;
        }
      }

      if (!duplicate) {
        const orderTicket = this.orderTicketRepo.create({
          orderId: order.id,
          ticketId: ticket.id,
          quantity: item.ticketQuantity,
          unitPrice: ticket.price,
        });
        orderTicketArr.push(orderTicket);
      }
    }

    order.total = totalAmount;

    await Promise.all([
      this.orderTicketRepo.save(orderTicketArr),
      this.ticketRepo.save(tickets),
      this.orderRepo.save(order),
    ]);

    return order;
  }

  findUserOrders(userId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: {
        userId: userId,
      },
      relations:['orderTickets']
    }
  );
  }
}
