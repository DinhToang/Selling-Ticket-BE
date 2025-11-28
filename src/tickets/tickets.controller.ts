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
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('admin/tickets')
@ApiBearerAuth('JWT-auth')

export class AdminTicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketTO: CreateTicketDTO): Promise<Ticket> {
    return this.ticketsService.create(createTicketTO);
  }

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Ticket | null> {
    return this.ticketsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTicketDTO: UpdateTicketDTO,
  ): Promise<UpdateResult> {
    return this.ticketsService.update(id, updateTicketDTO);
  }

  @Delete(':id')
  delete(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
    return this.ticketsService.remove(id);
  }
}

@Controller('tickets')
export class UserTicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketsService.findAllTicketForUser();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): Promise<Ticket | null> {
    return this.ticketsService.findOneTicketForUser(id);
  }
}
