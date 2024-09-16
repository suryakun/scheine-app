import { Template } from '../db/entities/template.entity';
import { templateRepository, scheineRepository } from '../db/repositories/appRepository';

export const templateService = {
  async create(templateData: Partial<Template>): Promise<Template> {
    const newTemplate = templateRepository.create(templateData);
    return await templateRepository.save(newTemplate);
  },

  async fetchByScheine(scheineId: number): Promise<Template[]> {
    const scheine = await scheineRepository.findOne({
      where: { id: scheineId },
      relations: ['scheineType'],
    });

    if (!scheine) {
      throw new Error('Scheine not found');
    }

    return await templateRepository.find({
      where: { scheineType: { id: scheine.id } },
      relations: ['scheineType'],
    });
  },

  async update(id: number, templateData: Partial<Template>): Promise<Template | null> {
    await templateRepository.update(id, templateData);
    return await templateRepository.findOne({
      where: { id },
      relations: ['scheineType'],
    });
  },

  async getById(id: number): Promise<Template | null> {
    return await templateRepository.findOne({
      where: { id },
      relations: ['scheineType'],
    });
  },
};
