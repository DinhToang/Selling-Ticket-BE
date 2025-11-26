import { Injectable } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDTO } from './dto/create-event-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/browser';
import { DeleteResult } from 'typeorm/browser';
import { UpdateEventDTO } from './dto/update-event-dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
  ) {}

  //Admin
  async create(createEventDTO: CreateEventDTO): Promise<Event> {
    const event = new Event();
    event.name = createEventDTO.name;
    event.description = createEventDTO.description;
    event.eventDate = createEventDTO.eventDate;

    return this.eventRepo.save(event);
  }

  findAll(): Promise<Event[]> {
    return this.eventRepo.find();
  }

  findOne(id: number): Promise<Event | null> {
    return this.eventRepo.findOneBy({ id });
  }

  update(id: number, recordToUpdate: UpdateEventDTO): Promise<UpdateResult> {
    return this.eventRepo.update(id, recordToUpdate);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.eventRepo.delete(id);
  }

  //User
  findAllEventForUser(): Promise<Event[]> {
    return this.eventRepo.find({
      where: {
        eventDate: MoreThan(new Date()),
      },
      relations: ['tickets'],
    });
  }

  findOneEventForUser(id: number): Promise<Event | null> {
    return this.eventRepo.findOne({
      where: {
        id: id,
        eventDate: MoreThan(new Date()),
      },
      relations: ['tickets'],
    });
  }
}
