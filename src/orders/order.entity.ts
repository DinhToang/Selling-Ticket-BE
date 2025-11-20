import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Ticket } from '../tickets/ticket.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // Một order chỉ thuộc về 1 user
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column()
  userId: number;

  // Một order có thể chứa nhiều ticket
  // Cách 1: Dùng One-to-Many + Many-to-One (phổ biến nhất)
  @OneToMany(() => Ticket, (ticket) => ticket.order, { cascade: true })
  tickets: Ticket[];

  // Cách 2: Nếu muốn 1 order chỉ có 1 ticket (như bạn nói ban đầu)
  // → dùng One-to-One thay vì One-to-Many
  /*
  @OneToOne(() => Ticket, (ticket) => ticket.order, { cascade: true })
  @JoinColumn()
  ticket: Ticket;
  */
}