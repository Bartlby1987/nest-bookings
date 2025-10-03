import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, QueryFailedError } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingsRepo: Repository<Booking>,
        @InjectRepository(Event)
        private readonly eventsRepo: Repository<Event>,
        private readonly dataSource: DataSource
    ) {}

    /**
     * Reserve a seat for eventId and userId.
     * Uses a DB transaction and pessimistic locking to avoid races.
     */
    async reserve(eventId: number, userId: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 1) Lock event row (FOR UPDATE)
            const event = await queryRunner.manager
                .createQueryBuilder(Event, 'e')
                .setLock('pessimistic_write')
                .where('e.id = :id', { id: eventId })
                .getOne();

            if (!event) {
                throw new NotFoundException('Event not found');
            }

            // 2) Count existing bookings for this event
            const bookedCount = await queryRunner.manager
                .createQueryBuilder(Booking, 'b')
                .where('b.event_id = :id', { id: eventId })
                .getCount();

            if (bookedCount >= event.totalSeats) {
                throw new BadRequestException('No seats available');
            }

            // 3) Create and save booking
            const booking = new Booking();
            booking.userId = userId;
            booking.event = event;

            const saved = await queryRunner.manager.save(booking);

            // 4) Commit
            await queryRunner.commitTransaction();
            return saved;
        } catch (err) {
            await queryRunner.rollbackTransaction();

            // Если уникальное ограничение - это дубликат booking (user already booked)
            if (err instanceof QueryFailedError) {
                const errAny = err as any;
                if (errAny.code === '23505') {
                    // Postgres unique_violation
                    throw new ConflictException('User already booked for this event');
                }
            }

            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    // Вспомогательные методы (list, find) — по желанию
    async findAll() {
        return this.bookingsRepo.find({ relations: ['event'] });
    }
}
