import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepo: Repository<Event>
    ) {}

    async create(dto: CreateEventDto) {
        const ev = new Event();
        ev.name = dto.name;
        ev.totalSeats = dto.total_seats;
        return this.eventsRepo.save(ev);
    }

    async findOne(id: number) {
        const ev = await this.eventsRepo.findOne({ where: { id } });
        if (!ev) throw new NotFoundException('Event not found');
        return ev;
    }

    async findAll() {
        return this.eventsRepo.find();
    }
}
