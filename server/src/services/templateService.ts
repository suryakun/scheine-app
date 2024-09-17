import { Template } from '../db/entities/template.entity';
import { templateRepository } from '../db/repositories/appRepository';

export const templateService = {
  async getTemplateBySchieneTypeId(scheineTypeId: number): Promise<Template | null> {
    return await templateRepository.findOne({
      where: { scheineType: { id: scheineTypeId } },
      relations: ['scheineType'],
    });
  },
};
