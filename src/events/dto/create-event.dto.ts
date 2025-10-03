import { IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEventDto {
    @IsString()
    name: string;

    @IsInt()
    @Min(1)
    @Type(() => Number)
    total_seats: number;
}
