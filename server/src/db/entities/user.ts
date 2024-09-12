import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schein } from './scheine';
import { BaseEntity } from './base';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'date' })
  birthday!: Date;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @OneToMany(() => Schein, schein => schein.patient)
  scheine: Schein[];
}
