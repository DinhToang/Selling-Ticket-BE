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
import { TicketsService } from './tickets.service';
import { CreateTicketDTO } from './dto/create-ticket-dto';
import { Ticket } from './ticket.entity';
import { UpdateResult } from 'typeorm';
import { UpdateTicketDTO } from './dto/update-ticket-dto';
import { DeleteResult } from 'typeorm/browser';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt/jwt-guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin - Tickets') // ← BẮT BUỘC PHẢI CÓ TỪ V6+
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('admin/tickets')
@ApiBearerAuth('JWT-auth')
export class AdminTicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ticket (For Admin only)' })
  @ApiResponse({
    status: 201,
    description: 'It will create a new ticket.',
    type: Ticket,
  })
  create(@Body() createTicketTO: CreateTicketDTO): Promise<Ticket> {
    return this.ticketsService.create(createTicketTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets (For Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will return all tickets.',
    type: [Ticket],
  })
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific ticket by ID (For Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will return the ticket with the specified ID.',
    type: Ticket,
  })
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Ticket | null> {
    return this.ticketsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a ticket by ID (For Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will update the ticket with the specified ID.',
    type: UpdateResult,
  })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTicketDTO: UpdateTicketDTO,
  ): Promise<UpdateResult> {
    return this.ticketsService.update(id, updateTicketDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket by ID (For Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will delete the ticket with the specified ID.',
  })
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
    return this.ticketsService.remove(id);
  }
}

@Controller('tickets')
export class UserTicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available tickets of the eventyy' })
  @ApiResponse({
    status: 200,
    description: 'It will return all tickets.',
    type: [Ticket],
  })
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAllTicketForUser();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a specific ticket by ID that is available to the user',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return the ticket with the specified ID.',
    type: Ticket,
  })
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Ticket | null> {
    return this.ticketsService.findOneTicketForUser(id);
  }
}
