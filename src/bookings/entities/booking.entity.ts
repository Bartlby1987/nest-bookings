import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

@Entity({ name: 'bookings' })
@Index(['event', 'userId'], { unique: true }) // попытка создать уникальность на уровне TypeORM (для надежности мы также сделали SQL-индекс)
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Event, (ev) => ev.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'event_id' })
    event: Event;

    @Column({ name: 'user_id' })
    userId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
