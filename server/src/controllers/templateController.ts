import { Request, Response, Router } from 'express';
import { templateService } from '../services/templateService';

export const templateController: Router = Router();

templateController.get('/scheine-type/:id', async (req: Request, res: Response) => {
  const scheineTypeId = parseInt(req.params.id, 10);

  if (isNaN(scheineTypeId)) {
    res.status(400).json({ error: 'Invalid scheineTypeId' });
    return;
  }

  try {
    const template = await templateService.getTemplateBySchieneTypeId(scheineTypeId);

    if (template) {
      res.json(template);
    } else {
      res.status(404).json({ error: `Template for ScheinType with ID ${scheineTypeId} not found` });
    }
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
