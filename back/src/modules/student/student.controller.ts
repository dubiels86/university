import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { Student } from '../entities/student.entity';
import { StudentDto } from './dto/student.dto';
import { StudentService } from './student.service';
import { Response } from 'express';

@Controller('students')
export class StudentController {
    constructor(private readonly _stService: StudentService) {}

    @Get(':id')
    async getStudent(@Param('id', ParseIntPipe) id: number) {
      const student = await this._stService.getOne(id);
      return student;
    }
  
    @Get()
    async getStudents(): Promise<StudentDto[]> {
      const students = await this._stService.getAll();
      return students;
    }
  
  
    @Post()
    async create(@Body() student: Student, @Res() res: Response) {
    
      try {
        await this._stService.create(student);
        return res.send({message: 'Estudiante creado satisfactoriamente'});
      } catch (error) {
        
          throw new HttpException('El estudiante ya existe.', HttpStatus.CONFLICT);
      }
          
    }
      
    @Patch(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() student: Student, @Res() res: Response
    ){
      await this._stService.update(id, student);
      return res.send({message: 'Estudiante actualizado satisfactoriamente'});
    }
  
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
      await this._stService.delete(id);
    }
  
}
