import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { UpdateResult } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { EventsService } from './events.service';
import { CreateEventDTO } from './dto/create-event-dto';
import { Event } from './event.entity';
import { UpdateEventDTO } from './dto/update-event-dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('admin/events')
export class AdminEventsController {
  constructor(private eventService: EventsService) {}

  @Post()
  create(@Body() createEventDTO: CreateEventDTO): Promise<Event> {
    return this.eventService.create(createEventDTO);
  }

  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Event | null> {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateEventDTO: UpdateEventDTO,
  ): Promise<UpdateResult> {
    return this.eventService.update(id, updateEventDTO);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
    return this.eventService.remove(id);
  }
}

@Controller('events')
export class UserEventsController {
  constructor(private eventService: EventsService) {}
  @Get()
  findAll(): Promise<Event[]> {
    return this.eventService.findAllEventForUser();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Event | null> {
    return this.eventService.findOneEventForUser(id);
  }
}