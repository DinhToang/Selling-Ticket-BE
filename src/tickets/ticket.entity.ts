import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Event } from 'src/events/event.entity';
import { OrderTicket } from 'src/orders/order-ticket.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'VIP', description: 'Type of the ticket' })
  @Column()
  type: string; // VIP, Standard

  @ApiProperty({ example: 100, description: 'Price of the ticket in USD' })
  @Column({ type: 'int' })
  price: number;

  @ApiProperty({ example: 50, description: 'Total number of available tickets' })
  @Column({ type: 'int', default: 0 })
  availableTicket: number; // tổng số vé có sẵn

  @ApiProperty({ example: '2024-12-31T23:59:59Z', description: 'Expiration date of the ticket' })
  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

  @ApiProperty({ example: '2024-12-31T23:59:59Z', description: 'Last update date of the ticket' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updated: Date;

  // Ticket thuộc về 1 Event
  @ManyToOne(() => Event, (event) => event.tickets, { onDelete: 'CASCADE' })
  event: Event;

  @Column()
  eventId: number;

  // ticket.entity.ts
  @OneToMany(() => OrderTicket, (ot) => ot.ticket)
  orderTickets: OrderTicket[];
}
