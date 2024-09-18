import { Scheine } from '../db/entities/scheine.entity';
import { CreateScheineDto } from '../types/scheine.dto';
import { scheineRepository } from '../db/repositories/appRepository';
import logger from '../utils/logger';
import { scheineTypeService } from './scheineTypeService';

export const scheineService = {
  async findAll(): Promise<Scheine[]> {
    return scheineRepository.find({
      relations: ['patient', 'doctor', 'template', 'type'],
    });
  },

  async findOne(id: number): Promise<Scheine | null> {
    return scheineRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor', 'template', 'type'],
    });
  },

  async create(createScheineDto: CreateScheineDto): Promise<Scheine> {
    const scheineType = await scheineTypeService.getScheineTypeById(createScheineDto.typeId);

    if (!scheineType) {
      throw new Error('Invalid ScheineType');
    }

    logger.info(scheineType);

    const validatedAttributes = this.validateAttributes(
      createScheineDto.attributes,
      Object.fromEntries(scheineType.attributeDefinitions.map(def => [def.key, def.type])),
    );

    const scheine = scheineRepository.create({
      type: { id: createScheineDto.typeId },
      patient: { id: createScheineDto.patientId },
      doctor: { id: createScheineDto.doctorId },
      attributes: validatedAttributes,
    });

    return scheineRepository.save(scheine);
  },

  validateAttributes(
    attributes: Record<string, string | boolean>,
    attributeDefinition: { [key: string]: string | boolean },
  ): Record<string, string | boolean> {
    const validatedAttributes: Record<string, string | boolean> = {};

    for (const [key, value] of Object.entries(attributes)) {
      if (attributeDefinition.hasOwnProperty(key)) {
        // You can add more specific validation based on the attributeDefinition type here
        validatedAttributes[key] = value;
      }
    }

    return validatedAttributes;
  },
};
