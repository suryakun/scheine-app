import { Repository } from 'typeorm';
import AppDataSource from '../datasource';
import { User } from '../entities/user';
import { Doctor } from '../entities/doctor';
import { AttributeDefinition } from '../entities/attributeDefinition';
import { Scheine } from '../entities/scheine';
import { ScheineAttribute } from '../entities/scheineAttribute';
import { ScheineType } from '../entities/scheineType';
import { Template } from '../entities/template';

export const userRepository: Repository<User> = AppDataSource.getRepository(User);

export const doctorRepository: Repository<Doctor> = AppDataSource.getRepository(Doctor);

export const attributeDefinitionRepository: Repository<AttributeDefinition> =
  AppDataSource.getRepository(AttributeDefinition);

export const scheineRepository: Repository<Scheine> = AppDataSource.getRepository(Scheine);

export const scheineAttributeRepository: Repository<ScheineAttribute> =
  AppDataSource.getRepository(ScheineAttribute);

export const schineTypeRepository: Repository<ScheineType> =
  AppDataSource.getRepository(ScheineType);

export const templateRepository: Repository<Template> = AppDataSource.getRepository(Template);
