import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamptz' })
  eventDate: Date;

  @CreateDateColumn({ type: 'timestamptz'})
  createdAt: Date;

  // Một event có nhiều ticket
  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];
}