import { IsString, MaxLength, IsNumber, IsDecimal, IsDate } from "class-validator";
import { Exclude, Expose } from 'class-transformer';
import { Student } from "src/modules/entities/student.entity";


@Exclude()
export class CarDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    @MaxLength(30, {message: 'This name is not valid'})
    readonly name: string;

    @Expose()
    @IsString()
    @MaxLength(50, {message: 'This teacher is not valid'})
    readonly teacher: string;

    
    readonly students: Student[];


}