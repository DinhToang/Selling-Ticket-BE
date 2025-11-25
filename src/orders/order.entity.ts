import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { OrderTicket } from './order-ticket.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'cancelled';

  @Column()
  total: number

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  // Order thuộc 1 User
  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;

  // Order chứa nhiều loại vé (qua bảng trung gian)
  @OneToMany(() => OrderTicket, (ot) => ot.order, { cascade: true })
  orderTickets: OrderTicket[];
}
