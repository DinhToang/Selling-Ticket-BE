import { Module } from '@nestjs/common';
import {
  TicketsAdminController,
  TicketsUserController,
} from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [TicketsAdminController, TicketsUserController],
  providers: [
    TicketsService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [TicketsService],
})
export class TicketsModule {}
