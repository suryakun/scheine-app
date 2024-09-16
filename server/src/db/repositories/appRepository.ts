import { Repository } from 'typeorm';
import AppDataSource from '../datasource';
import { User } from '../entities/user.entity';
import { Doctor } from '../entities/doctor.entity';
import { AttributeDefinition } from '../entities/attributeDefinition.entity';
import { Scheine } from '../entities/scheine.entity';
import { ScheineType } from '../entities/scheineType.entity';
import { Template } from '../entities/template.entity';

export const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const doctorRepository: Repository<Doctor> = AppDataSource.getRepository(Doctor);

export const attributeDefinitionRepository: Repository<AttributeDefinition> =
  AppDataSource.getRepository(AttributeDefinition);

export const scheineRepository: Repository<Scheine> = AppDataSource.getRepository(Scheine);

export const scheineTypeRepository: Repository<ScheineType> =
  AppDataSource.getRepository(ScheineType);

export const templateRepository: Repository<Template> = AppDataSource.getRepository(Template);
