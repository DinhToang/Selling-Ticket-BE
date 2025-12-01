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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('admin/events')
@ApiBearerAuth('JWT-auth')
export class AdminEventsController {
  constructor(private eventService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event (For Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'It will create a new event.',  })
  create(@Body() createEventDTO: CreateEventDTO): Promise<Event> {
    return this.eventService.create(createEventDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all events (For Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will return all events.',  })
  findAll(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific event by ID (For Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will return the event with the specified ID.',  })
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Event | null> {
    return this.eventService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an event by ID (For Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will update the event with the specified ID.',  })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateEventDTO: UpdateEventDTO,
  ): Promise<UpdateResult> {
    return this.eventService.update(id, updateEventDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an event by ID (For Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will delete the event with the specified ID.',  })
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
    return this.eventService.remove(id);
  }
}

@Controller('events')
export class UserEventsController {
  constructor(private eventService: EventsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all available events' })
  @ApiResponse({
    status: 200,
    description: 'It will return all events.',  })
  findAll(): Promise<Event[]> {
    return this.eventService.findAllEventForUser();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific event by ID that is available to the user' })
  @ApiResponse({
    status: 200,
    description: 'It will return the event with the specified ID.',  })
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Event | null> {
    return this.eventService.findOneEventForUser(id);
  }
}
