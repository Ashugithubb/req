import { Requirement } from "src/requirements/entities/requirement.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string
    
    @ManyToMany(() => Requirement, (req) => req.requested_by)
      requested_requirements: Requirement[];
}
