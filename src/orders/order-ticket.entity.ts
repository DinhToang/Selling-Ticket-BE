// file: order-ticket.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Order } from './order.entity';
import { Ticket } from '../tickets/ticket.entity';

@Entity('order_tickets')
export class OrderTicket {
  // Dùng 2 khóa chính ghép làm khóa chính
  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  ticketId: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  unitPrice: number;        // giá lúc mua

//   @Column({ type: 'decimal', precision: 12, scale: 2, default: '0' })
//   discount: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.id, { onDelete: 'CASCADE' })
  order: Order;

  @ManyToOne(() => Ticket, (ticket) => ticket.id, { onDelete: 'CASCADE' })
  ticket: Ticket;
}