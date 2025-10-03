import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule } from './events/events.module';
import { BookingsModule } from './bookings/bookings.module';
import { Event } from './events/entities/event.entity';
import { Booking } from './bookings/entities/booking.entity';

@Module({
    imports: [
        // 1. Подключаем ConfigModule, чтобы читать .env
        ConfigModule.forRoot({
            isGlobal: true, // можно использовать в любом месте
        }),

        // 2. Подключаем TypeORM через ConfigService
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get<string>('DB_USER'),
                password: config.get<string>('DB_PASS'),
                database: config.get<string>('DB_NAME'),
                entities: [Event, Booking],
                synchronize: true, // для разработки
            }),
        }),

        EventsModule,
        BookingsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
