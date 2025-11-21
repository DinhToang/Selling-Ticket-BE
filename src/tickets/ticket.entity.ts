import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event: string; // hoặc liên kết với Event entity sau này

  @Column()
  type: string; // VIP, Standard, Early Bird...

  // @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  // created: Date;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  // updated: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated: Date;

  @Column({ type: 'timestamptz', nullable: false })
  available: Date;

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt?: Date;

  // Một ticket chỉ thuộc về 1 order (hoặc null nếu chưa bán)
  @OneToOne(() => Order, (order) => order.tickets, { nullable: true })
  @JoinColumn()
  order?: Order;

  @Column({ nullable: true })
  orderId?: number;
}
