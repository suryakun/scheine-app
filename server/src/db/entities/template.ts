import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ScheineType } from './scheineType';
import { Scheine } from './scheine';
import { BaseEntity } from './base';

@Entity()
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  pdfTemplate: string;

  @ManyToOne(() => ScheineType, scheineType => scheineType.templates)
  scheineType: ScheineType;

  @OneToMany(() => Scheine, schein => schein.template)
  scheine: Scheine[];
}
