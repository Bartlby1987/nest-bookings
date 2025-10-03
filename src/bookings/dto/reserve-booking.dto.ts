import { IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReserveBookingDto {
    @IsInt()
    @Type(() => Number)
    event_id: number;

    @IsString()
    user_id: string;
}
