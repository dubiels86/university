import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
