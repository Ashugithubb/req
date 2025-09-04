import { Domain } from 'src/domain/entities/domain.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('requirements')
export class Requirement {
  @PrimaryGeneratedColumn()
  requirement_id: number;

  @Column()
  name: string;

  @Column({ length: 500 })
  description: string;

  @ManyToOne(() => Institution, (inst) => inst.requirements, { eager: true })
  requesting_institution: Institution;

  @ManyToMany(() => Institution, (inst) => inst.benefited_requirements, { eager: true })
  @JoinTable({
    name: 'requirement_benefited_institutions',
    joinColumn: { name: 'requirement_id', referencedColumnName: 'requirement_id' },
    inverseJoinColumn: { name: 'institution_id', referencedColumnName: 'institution_id' },
  })
  benefited_institutions: Institution[];

  @Column()
  total_benefited_institutions: number;

  @Column({ type: 'enum', enum: ['Yes', 'No'] })
  obligatory: string;

  @Column({ type: 'enum', enum: ['Yes', 'No'] })
  alternative_solution_exists: string;

  @Column({ type: 'enum', enum: ['Virtual', 'Presencial', 'Virtual/Presencial'] })
  study_modality: string;

  @Column({ type: 'enum', enum: ['Under', 'Medium', 'High', 'Very High'] })
  impact_users: string;

  @Column()
  impact: number;

  @Column({ type: 'enum', enum: ['XS', 'S', 'M', 'L', 'XL'] })
  complexity_effort: string;

  @Column({ type: 'enum', enum: ['Under', 'Medium', 'High'] })
  client_priority: string;

  @Column({ type: 'enum', enum: ['Under', 'Medium', 'High', 'Discarded'] })
  priority_management: string;

  @ManyToOne(() => Domain, (domain) => domain.requirements, { eager: true })
  domain: Domain;

  @ManyToMany(() => Domain, (domain) => domain.collaborator_requirements, { eager: true })
  @JoinTable({
    name: 'requirement_collaborator_domains',
    joinColumn: { name: 'requirement_id', referencedColumnName: 'requirement_id' },
    inverseJoinColumn: { name: 'domain_id', referencedColumnName: 'domain_id' },
  })
  collaborator_domains: Domain[];

  @ManyToMany(() => Domain, (domain) => domain.follower_requirements, { eager: true })
  @JoinTable({
    name: 'requirement_follower_domains',
    joinColumn: { name: 'requirement_id', referencedColumnName: 'requirement_id' },
    inverseJoinColumn: { name: 'domain_id', referencedColumnName: 'domain_id' },
  })
  follower_domains: Domain[];

  @Column({ default: 'Registered' })
  state: string;

  @Column({ type: 'date', nullable: true })
  start_date: string;

  @Column({ type: 'date', nullable: true })
  finish_date: string;

  @Column({ type: 'enum', enum: ['Internal', 'External', 'Client'] })
  type: string;

  @ManyToMany(() => User, (user) => user.requested_requirements, { eager: true })
  @JoinTable({
    name: 'requirement_requested_by',
    joinColumn: { name: 'requirement_id', referencedColumnName: 'requirement_id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'user_id' },
  })
  requested_by: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
