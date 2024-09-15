import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { Scheine } from './scheine';
import { AttributeDefinition } from './attributeDefinition';
import { BaseEntity } from './base';

@Entity()
export class ScheineAttribute extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Scheine, scheine => scheine.attributes)
  scheine: Scheine;

  @OneToOne(() => AttributeDefinition, attrDef => attrDef.scheineAttribute)
  definition: AttributeDefinition;

  @Column('text')
  value: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;
}
