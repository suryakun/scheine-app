import { Scheine } from '../db/entities/scheine';
import { AttributeDefinition } from '../db/entities/attributeDefinition';
import { ScheineAttribute } from '../db/entities/scheineAttribute';
import {
  scheineRepository,
  attributeDefinitionRepository,
  scheineAttributeRepository,
} from '../db/repositories/appRepository';

export const scheineService = {
  async create(scheineData: Partial<Scheine>): Promise<Scheine> {
    const newScheine = scheineRepository.create(scheineData);
    return await scheineRepository.save(newScheine);
  },

  async update(id: number, scheineData: Partial<Scheine>): Promise<Scheine | null> {
    await scheineRepository.update(id, scheineData);
    return await this.getById(id);
  },

  async getById(id: number): Promise<Scheine | null> {
    return await scheineRepository.findOne({
      where: { id },
      relations: [
        'scheineType',
        'scheineType.attributeDefinitions',
        'attributes',
        'attributes.attributeDefinition',
      ],
    });
  },

  async fetch(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ scheines: Scheine[]; total: number }> {
    const [scheines, total] = await scheineRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: [
        'scheineType',
        'scheineType.attributeDefinitions',
        'attributes',
        'attributes.attributeDefinition',
      ],
    });
    return { scheines, total };
  },

  async addAttributeDefinition(
    scheineTypeId: number,
    attributeData: Partial<AttributeDefinition>,
  ): Promise<AttributeDefinition> {
    const newAttributeDef = attributeDefinitionRepository.create({
      ...attributeData,
      scheineType: { id: scheineTypeId },
    });
    return await attributeDefinitionRepository.save(newAttributeDef);
  },

  async fillAttributeValue(
    scheineId: number,
    attributeDefinitionId: number,
    value: string,
  ): Promise<ScheineAttribute> {
    let scheineAttribute = await scheineAttributeRepository.findOne({
      where: {
        scheine: { id: scheineId },
        attributeDefinition: { id: attributeDefinitionId },
      },
    });

    if (!scheineAttribute) {
      scheineAttribute = scheineAttributeRepository.create({
        scheine: { id: scheineId },
        attributeDefinition: { id: attributeDefinitionId },
        value,
      });
    } else {
      scheineAttribute.value = value;
    }

    return await scheineAttributeRepository.save(scheineAttribute);
  },
};
