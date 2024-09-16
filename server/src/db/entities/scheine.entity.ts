import { Entity, PrimaryGeneratedColumn, ManyToOne, Index, Column, Relation } from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { Template } from './template.entity';
import { BaseEntity } from './base.entity';
import { ScheineType } from './scheineType.entity';

@Entity()
@Index(['patient', 'doctor', 'template'])
export class Scheine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-json')
  attributes: { [key: string]: string };

  @Column({ nullable: true, type: 'text' })
  pdfUrl: string;

  @ManyToOne(() => User, user => user.scheine)
  patient: Relation<User>;

  @ManyToOne(() => Doctor, doctor => doctor.scheine)
  doctor: Relation<Doctor>;

  @ManyToOne(() => Template, template => template.scheine)
  template: Relation<Template>;

  @ManyToOne(() => ScheineType)
  type: Relation<ScheineType>;
}
