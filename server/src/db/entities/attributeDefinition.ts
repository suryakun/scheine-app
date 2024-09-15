import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  Index,
  JoinColumn,
} from 'typeorm';
import { ScheineType } from './scheineType';
import { ScheineAttribute } from './scheineAttribute';
import { BaseEntity } from './base';

@Entity()
@Index(['scheineType', 'key'], { unique: true })
export class AttributeDefinition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ScheineType, scheineType => scheineType.attributeDefinitions)
  scheineType: ScheineType;

  @OneToOne(() => ScheineAttribute)
  @JoinColumn()
  scheineAttribute: ScheineAttribute;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'varchar' })
  label: string;

  @Column({ type: 'varchar' })
  type: string; // e.g., 'text', 'date', 'number', etc.

  @Column({ nullable: true, type: 'text' })
  options: string; // For dropdown or multi-select fields, store options as JSON string
}
