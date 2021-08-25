import { Repository, EntityRepository } from "typeorm";
import { Student } from "../entities/student.entity";


@EntityRepository(Student)
export class StudentRepository extends Repository<Student>{}