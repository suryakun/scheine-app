import { Router, Request, Response } from 'express';
import { doctorService } from '../services/doctorService';
import { TypeDoctorPayload } from '../types/doctorPayload';

export const doctorController: Router = Router();

doctorController.get('/', async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;
    const { doctors, total } = await doctorService.fetch(page, pageSize);
    res.json({ doctors, total, page, pageSize });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
});

doctorController.get('/search', async (req: Request, res: Response) => {
  try {
    const name: string = req.query.name as string;
    const page: number = Number(req.query.page) || 1;
    const pageSize: number = Number(req.query.pageSize) || 10;
    const { doctors, total } = await doctorService.searchByName(name, page, pageSize);
    res.json({ doctors, total, page, pageSize });
  } catch (error) {
    res.status(500).json({ message: 'Error searching doctors', error });
  }
});

doctorController.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const body: TypeDoctorPayload = req.body;
    const doctor = await doctorService.update(id, body);
    if (doctor) {
      res.json(doctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctor', error });
  }
});

doctorController.post('/', async (req: Request, res: Response) => {
  try {
    const doctorData: TypeDoctorPayload = req.body;
    const newDoctor = await doctorService.create(doctorData);
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Error creating doctor', error });
  }
});

doctorController.put('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const doctorData: TypeDoctorPayload = req.body;
    const updatedDoctor = await doctorService.update(id, doctorData);
    if (updatedDoctor) {
      res.json(updatedDoctor);
    } else {
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating doctor', error });
  }
});
