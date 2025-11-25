import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { MoreThan, Repository } from 'typeorm';
import { CreateTicketDTO } from './dto/create-ticket-dto';
import { UpdateTicketDTO } from './dto/update-ticket-dto';
import { UpdateResult } from 'typeorm/browser';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepo: Repository<Ticket>,
  ) {}

  //ADMIN

  async create(ticketDTO: CreateTicketDTO) {
    const ticket = new Ticket();
    ticket.type = ticketDTO.type;
    ticket.price = ticketDTO.price;
    ticket.availableTicket = ticketDTO.availableTicket;
    ticket.eventId = ticketDTO.eventId;

    return await this.ticketsRepo.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketsRepo.find();
  }

  findOne(id: number): Promise<Ticket | null> {
    return this.ticketsRepo.findOneBy({ id });
  }

  update(id: number, recordToUpdate: UpdateTicketDTO): Promise<UpdateResult> {
    return this.ticketsRepo.update(id, recordToUpdate);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.ticketsRepo.delete(id);
  }

  //USER
  findAllTicketForUser(): Promise<Ticket[]> {
    return this.ticketsRepo.find({
      where: {
        event: {
          eventDate: MoreThan(new Date()),
        },
      },
      relations: ['event'],
    });
  }

  findOneTicketForUser(id: number): Promise<Ticket | null> {
    return this.ticketsRepo.findOne({
      where: {
        id: id,
        event: {
          eventDate: MoreThan(new Date()),
        },
      },
      relations: ['event'],
    });
  }
}
