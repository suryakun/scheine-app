import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Schein } from './scheine';
import { AttributeDefinition } from './attributeDefinition';
import { BaseEntity } from './base';

@Entity()
export class ScheinAttribute extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Schein, schein => schein.attributes)
  schein: Schein;

  @OneToOne(() => AttributeDefinition, attrDef => attrDef.values)
  attributeDefinition: AttributeDefinition;

  @Column('text')
  value: string;
}
