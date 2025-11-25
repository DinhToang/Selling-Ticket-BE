import { Module } from '@nestjs/common';
import { AdminEventsController, UserEventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [AdminEventsController, UserEventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
