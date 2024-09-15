import { ScheineType } from '@/db/entities/scheineType';
import { schineTypeRepository } from '@/db/repositories/appRepository';
export class ScheineTypeService {
  constructor(private scheineTypeRepository = schineTypeRepository) {}

  async getAllScheineTypes(): Promise<ScheineType[]> {
    return this.scheineTypeRepository.find();
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
