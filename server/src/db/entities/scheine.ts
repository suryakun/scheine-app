import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Index, Column } from 'typeorm';
import { User } from './user';
import { Doctor } from './doctor';
import { Template } from './template';
import { ScheineAttribute } from './scheineAttribute';
import { BaseEntity } from './base';

@Entity()
@Index(['patient', 'doctor', 'template'])
export class Scheine extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.scheine)
  patient: User;

  @ManyToOne(() => Doctor, doctor => doctor.scheine)
  doctor: Doctor;

  @ManyToOne(() => Template, template => template.scheine)
  template: Template;

  @OneToMany(() => ScheineAttribute, attribute => attribute.scheine, { cascade: true })
  attributes: ScheineAttribute[];

  @Column({ nullable: true, type: 'text' })
  pdfUrl: string;
}
