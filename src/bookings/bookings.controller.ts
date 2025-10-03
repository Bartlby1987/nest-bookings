import { Controller, Post, Body } from '@nestjs/common';
import { ReserveBookingDto } from './dto/reserve-booking.dto';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Post('reserve')
    async reserve(@Body() dto: ReserveBookingDto) {
        const booking = await this.bookingsService.reserve(dto.event_id, dto.user_id);
        return { success: true, booking };
    }
}
