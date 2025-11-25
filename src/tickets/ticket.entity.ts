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

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // VIP, Standard

  @Column({ type: 'int'})
  price: number;

  @Column({ type: 'int', default: 0 })
  availableTicket: number; // tổng số vé có sẵn

  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

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
