import { doctorRepository } from '../db/repositories/appRepository';
import { Doctor } from '../db/entities/doctor.entity';
import { Like } from 'typeorm';
import { CreateDoctorDto } from '../types/doctor.dto';

export const doctorService = {
  async fetch(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ doctors: Doctor[]; total: number }> {
    const [doctors, total] = await doctorRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { doctors, total };
  },

  async findById(id: number): Promise<Doctor | null> {
    return await doctorRepository.findOne({ where: { id } });
  },

  async create(doctorData: CreateDoctorDto): Promise<Doctor> {
    const newDoctor = doctorRepository.create(doctorData);
    return await doctorRepository.save(newDoctor);
  },

  async update(id: number, doctorData: CreateDoctorDto): Promise<Doctor | null> {
    await doctorRepository.update(id, doctorData);
    return await doctorRepository.findOne({ where: { id } });
  },

  async searchByName(
    name: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ doctors: Doctor[]; total: number }> {
    const [doctors, total] = await doctorRepository.findAndCount({
      where: { first_name: Like(`%${name}%`) },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { doctors, total };
  },
};
