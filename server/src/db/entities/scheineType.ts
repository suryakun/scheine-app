import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Template } from './template';
import { AttributeDefinition } from './attributeDefinition';
import { BaseEntity } from './base';

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
}
