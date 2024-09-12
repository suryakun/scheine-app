import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Index, Column } from 'typeorm';
import { User } from './user';
import { Doctor } from './doctor';
import { Template } from './template';
import { ScheinAttribute } from './scheineAttribute';
import { BaseEntity } from './base';

@Entity()
@Index(['patient', 'doctor', 'template'])
export class Schein extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.scheine)
  patient: User;

  @ManyToOne(() => Doctor, doctor => doctor.scheine)
  doctor: Doctor;

  @ManyToOne(() => Template, template => template.scheine)
  template: Template;

  @OneToMany(() => ScheinAttribute, attribute => attribute.schein, { cascade: true })
  attributes: ScheinAttribute[];

  @Column({ nullable: true, type: 'text' })
  pdfUrl: string;
}
