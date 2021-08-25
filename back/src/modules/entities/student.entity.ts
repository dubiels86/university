import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './group.entity';


@Entity('student')   
export class Student extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type: 'varchar', nullable:true})
    name: string;

    @Column({type: 'number', nullable:true})
    age: number;

    @Column({type: 'varchar', nullable:true})
    sex: string;

    @Column({type: 'varchar', nullable:true})
    email: string;

    @Column({type: 'date'})
    birthday: Date;

    @Column({type: 'varchar', nullable:true})
    place_birth: string;

    @ManyToOne(() => Group, group => group.students, {  })
	@JoinColumn({ name: 'id_student_id'})
	group: Group | null;
    
    @Column({ type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date
   
}