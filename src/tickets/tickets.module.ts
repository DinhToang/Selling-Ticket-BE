import { Module } from '@nestjs/common';
import {
  AdminTicketsController,
  UserTicketsController,
} from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [AdminTicketsController, UserTicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
