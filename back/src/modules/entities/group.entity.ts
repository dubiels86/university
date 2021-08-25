
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,  OneToMany } from 'typeorm';
import { Student } from './student.entity';


@Entity('group')   
export class Group extends BaseEntity{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type: 'varchar', nullable: true})
    name: string;
    
    @Column({type: 'varchar', nullable: true})
    teacher: string;

    @OneToMany(() => Student, student => student.group)
	students: Student[];
    
    @Column({ type: 'varchar', default: 'ACTIVE', length: 8})
    status: string;

    @CreateDateColumn({type: 'timestamp', name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
    updatedAt: Date

}