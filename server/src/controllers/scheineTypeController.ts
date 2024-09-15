import { Router, Request, Response } from 'express';
import { ScheineTypeService } from '../services/scheineTypeService';

const scheineTypeService = new ScheineTypeService();

export const scheineTypeController: Router = Router();

scheineTypeController.get('/', async (_req: Request, res: Response) => {
  try {
    const scheineTypes = await scheineTypeService.getAllScheineTypes();
    res.json(scheineTypes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scheine types', error });
  }
});

scheineTypeController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const scheineType = await scheineTypeService.getScheineTypeById(id);
    if (scheineType) {
      res.json(scheineType);
    } else {
      res.status(404).json({ message: 'Scheine type not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching scheine type', error });
  }
});
