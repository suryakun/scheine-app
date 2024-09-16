import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Relation } from 'typeorm';
import { ScheineType } from './scheineType.entity';
import { Scheine } from './scheine.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  pdfTemplate: string;

  @ManyToOne(() => ScheineType, scheineType => scheineType.templates)
  scheineType: Relation<ScheineType>;

  @OneToMany(() => Scheine, schein => schein.template)
  scheine: Relation<Scheine[]>;
}
