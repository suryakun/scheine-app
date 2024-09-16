import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Template } from './template.entity';
import { AttributeDefinition } from './attributeDefinition.entity';
import { Scheine } from './scheine.entity';

@Entity()
export class ScheineType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Template, template => template.scheineType)
  templates: Template[];

  @OneToMany(() => AttributeDefinition, attrDef => attrDef.scheineType)
  attributeDefinitions: AttributeDefinition[];

  @OneToMany(() => Scheine, scheine => scheine.type)
  type: Scheine[];
}
