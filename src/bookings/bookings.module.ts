import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Event } from '../events/entities/event.entity';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Booking, Event])],
    controllers: [BookingsController],
    providers: [BookingsService],
    exports: [BookingsService]
})
export class BookingsModule {}
