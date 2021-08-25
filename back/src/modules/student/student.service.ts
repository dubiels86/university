import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager } from "typeorm";
import { Student } from "../entities/student.entity";
import { StudentDto } from "./dto/student.dto";
import { StudentRepository } from "./student.repository";
import { status } from "../shared/entity-status.enum";
import { plainToClass } from "class-transformer";

@Injectable()
export class StudentService {
  manager = getManager();
  constructor(
    @InjectRepository(StudentRepository)
    private readonly _studentRepository: StudentRepository
  ) {}

  async getOne(id: number): Promise<StudentDto> {
    if (!id) {
      throw new BadRequestException("id must be sent");
    }

    const student: Student = await this._studentRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!student) {
      throw new NotFoundException();
    }

    return plainToClass(StudentDto, student);
  }

  async getAll(): Promise<StudentDto[]> {
    const students: Student[] = await this._studentRepository.find({
      where: { status: status.ACTIVE },
    });

    return students.map((st: Student) => plainToClass(StudentDto, st));
  }

  async create(student: Student) {
    const p = await this._studentRepository.findOne({ name: student.name });
    if (p) {
      throw new HttpException("El estudiante ya existe.", HttpStatus.CONFLICT);
    }
    await this._studentRepository.save(student);
  }

  async update(id: number, st: Partial<StudentDto>): Promise<StudentDto> {
    const foundStudent: Student = await this._studentRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });
    if (!foundStudent) {
      throw new NotFoundException("This Student does not exist");
    }

    foundStudent.age = st.age;
    foundStudent.birthday = st.birthday;
    foundStudent.email = st.email;
    foundStudent.group = st.group;
    foundStudent.name = st.name;
    foundStudent.place_birth = st.place_birth;
    foundStudent.sex = st.sex;

    const savedStudent = await this._studentRepository.save(foundStudent);

    return plainToClass(StudentDto, savedStudent);
  }

  async delete(id: number): Promise<void> {
    const studentExists = await this._studentRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!studentExists) {
      throw new NotFoundException();
    }

    await this._studentRepository.update(id, { status: status.INACTIVE });
  }
}
