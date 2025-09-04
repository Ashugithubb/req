import { Requirement } from "src/requirements/entities/requirement.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('domains')
export class Domain {
  @PrimaryGeneratedColumn()
  domain_id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Requirement, (req) => req.domain)
  requirements: Requirement[];

  @ManyToMany(() => Requirement, (req) => req.collaborator_domains)
  collaborator_requirements: Requirement[];

  @ManyToMany(() => Requirement, (req) => req.follower_domains)
  follower_requirements: Requirement[];
}
