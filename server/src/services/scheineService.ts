import { Scheine } from '../db/entities/scheine.entity';
import { CreateScheineDto } from '../types/scheine.dto';
import { scheineRepository, scheineTypeRepository } from '../db/repositories/appRepository';

export class ScheineService {
  scheineRepository: typeof scheineRepository;
  scheineTypeRepository: typeof scheineTypeRepository;
  constructor() {
    this.scheineRepository = scheineRepository;
    this.scheineTypeRepository = scheineTypeRepository;
  }

  async findAll(): Promise<Scheine[]> {
    return this.scheineRepository.find({
      relations: ['patient', 'doctor', 'template', 'type'],
    });
  }

  async findOne(id: number): Promise<Scheine | null> {
    return this.scheineRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor', 'template', 'type'],
    });
  }

  async create(createScheineDto: CreateScheineDto): Promise<Scheine> {
    const { type, attributes, ...rest } = createScheineDto;

    const scheineType = await this.scheineTypeRepository.findOne({
      where: { id: type.id },
    });

    if (!scheineType) {
      throw new Error('Invalid ScheineType');
    }

    const validatedAttributes = this.validateAttributes(
      attributes,
      Object.fromEntries(scheineType.attributeDefinitions.map(def => [def.key, def.type])),
    );

    const scheine = this.scheineRepository.create({
      ...rest,
      type,
      attributes: validatedAttributes,
    });

    return this.scheineRepository.save(scheine);
  }

  private validateAttributes(
    attributes: { [key: string]: string },
    attributeDefinition: { [key: string]: string },
  ): { [key: string]: string } {
    const validatedAttributes: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(attributes)) {
      if (attributeDefinition.hasOwnProperty(key)) {
        // You can add more specific validation based on the attributeDefinition type here
        validatedAttributes[key] = value;
      }
    }

    return validatedAttributes;
  }
}
