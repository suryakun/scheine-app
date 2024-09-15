import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Scheine } from './scheine';
import { BaseEntity } from './base';

@Entity()
export class Doctor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  first_name!: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ unique: true, type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  specialization: string;

  @OneToMany(() => Scheine, scheine => scheine.doctor)
  scheine: Scheine[];
}
