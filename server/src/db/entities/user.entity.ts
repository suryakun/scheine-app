import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Scheine } from './scheine.entity';
import 'reflect-metadata';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  first_name!: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  insurance: string;

  @Column({ type: 'date' })
  birthday!: Date;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @OneToMany(() => Scheine, scheine => scheine.patient)
  scheine: Relation<Scheine[]>;
}
