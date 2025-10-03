import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    async create(@Body() dto: CreateEventDto) {
        const ev = await this.eventsService.create(dto);
        return { success: true, event: ev };
    }

    @Get()
    async list() {
        const events = await this.eventsService.findAll();
        return { success: true, events };
    }

    @Get(':id')
    async get(@Param('id', ParseIntPipe) id: number) {
        const ev = await this.eventsService.findOne(id);
        return { success: true, event: ev };
    }
}
