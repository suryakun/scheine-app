import { Request, Response, Router } from 'express';
import { scheineService } from '../services/scheineService';
import { pdfService } from '../services/pdfService';
import { plainToClass } from 'class-transformer';
import { CreateScheineDto } from '../types/scheine.dto';

const scheineController: Router = Router();

scheineController.post('/', async (req: Request, res: Response) => {
  try {
    const body = plainToClass(CreateScheineDto, req.body);
    const scheine = await scheineService.create(body);

    if (!scheine) {
      res.status(404).json({ error: 'Scheine not found' });
      return;
    }

    const pdf = await pdfService.generatePdf(body);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=scheine_${new Date().getTime()}.pdf`,
    );
    res.send(pdf);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Error generating PDF' });
  }
});

export { scheineController };
