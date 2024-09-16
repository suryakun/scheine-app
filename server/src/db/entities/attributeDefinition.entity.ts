import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, Relation } from 'typeorm';
import { ScheineType } from './scheineType.entity';
import { BaseEntity } from './base.entity';

@Entity('attribute_definitions')
@Index(['scheineType', 'key'], { unique: true })
export class AttributeDefinition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar' })
  label: string;

  @Column({ type: 'varchar' })
  type: string; // e.g., 'text', 'date', 'number', etc.

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @ManyToOne(() => ScheineType, scheineType => scheineType.attributeDefinitions)
  scheineType: Relation<ScheineType>;
}
