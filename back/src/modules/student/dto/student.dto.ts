import { IsString, MaxLength, IsNumber, IsDecimal, IsDate, IsEmail } from "class-validator";
import { Exclude, Expose } from 'class-transformer';
import { Student } from "src/modules/entities/student.entity";
import { Group } from "src/modules/entities/group.entity";


@Exclude()
export class StudentDto {

    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsString()
    @MaxLength(30, {message: 'This name is not valid'})
    readonly name: string;

    @Expose()
    @IsNumber()
    @MaxLength(3, {message: 'This age is not valid'})
    readonly age: string;

    @Expose()
    @IsString()
    @MaxLength(10, {message: 'This sex is not valid'})
    readonly sex: string;

    @Expose()
    @IsEmail()
    @MaxLength(20, {message: 'This email is not valid'})
    readonly email: string;

    @Expose()
    @IsDate()
    @MaxLength(10, {message: 'This birthday is not valid'})
    readonly birthday: Date;

    @Expose()
    @IsString()
    @MaxLength(100, {message: 'This place of birth is not valid'})
    readonly place_birth: string;

    readonly group: Group;


}