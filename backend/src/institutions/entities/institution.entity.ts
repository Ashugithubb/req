import { Requirement } from "src/requirements/entities/requirement.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('institutions')
export class Institution {
  @PrimaryGeneratedColumn()
  institution_id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Requirement, (req) => req.requesting_institution)
  requirements: Requirement[];

  @ManyToMany(() => Requirement, (req) => req.benefited_institutions)
  benefited_requirements: Requirement[];
}
