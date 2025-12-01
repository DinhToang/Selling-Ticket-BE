import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Order } from '../orders/order.entity';
import { Exclude } from 'class-transformer';
import { Role } from 'src/auth/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Jane', description: 'First name of the user' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @Column()
  lastName: string;

  @ApiProperty({
    example: 'jane.doe@example.com',
    description: 'Email address of the user',
  })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @ApiProperty({ example: 'strongPassword123', description: 'Password of the user' })
  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  // Một user có nhiều order
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
