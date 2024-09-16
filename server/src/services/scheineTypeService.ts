import { ScheineType } from '../db/entities/scheineType.entity';
import {
  attributeDefinitionRepository,
  scheineTypeRepository,
} from '../db/repositories/appRepository';
import logger from '../utils/logger';
export class ScheineTypeService {
  scheineTypeRepository: typeof scheineTypeRepository;
  attributeDefinitionRepository: typeof attributeDefinitionRepository;

  constructor() {
    this.scheineTypeRepository = scheineTypeRepository;
    this.attributeDefinitionRepository = attributeDefinitionRepository;
  }

  async getAllScheineTypes(): Promise<ScheineType[]> {
    const scheineTypes = await this.scheineTypeRepository
      .createQueryBuilder('scheineType')
      .leftJoinAndSelect('scheineType.attributeDefinitions', 'attributeDefinition')
      .select([
        'scheineType',
        'attributeDefinition.key',
        'attributeDefinition.label',
        'attributeDefinition.type',
        'attributeDefinition.description',
      ])
      .getMany();

    logger.info(`Fetched ${scheineTypes.length} scheine types`);
    return scheineTypes;
  }

  async getScheineTypeById(id: number): Promise<ScheineType | null> {
    return this.scheineTypeRepository.findOne({
      where: { id },
      relations: {
        attributeDefinitions: true,
      },
    });
  }

  async createScheineType(scheineTypeData: Partial<ScheineType>): Promise<ScheineType> {
    const newScheineType = this.scheineTypeRepository.create(scheineTypeData);
    return this.scheineTypeRepository.save(newScheineType);
  }

  async updateScheineType(
    id: number,
    scheineTypeData: Partial<ScheineType>,
  ): Promise<ScheineType | null> {
    await this.scheineTypeRepository.update(id, scheineTypeData);
    return this.getScheineTypeById(id);
  }

  async deleteScheineType(id: number): Promise<void> {
    await this.scheineTypeRepository.delete(id);
  }
}

export const scheineTypeService = new ScheineTypeService();
