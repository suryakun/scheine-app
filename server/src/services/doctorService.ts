import { doctorRepository } from '../db/repositories/appRepository';
import { Doctor } from '../db/entities/doctor';
import { Like } from 'typeorm';
import { TypeDoctorPayload } from '../types/doctorPayload';

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

  async create(doctorData: TypeDoctorPayload): Promise<Doctor> {
    const newDoctor = doctorRepository.create(doctorData);
    return await doctorRepository.save(newDoctor);
  },

  async update(id: number, doctorData: TypeDoctorPayload): Promise<Doctor | null> {
    await doctorRepository.update(id, doctorData);
    return await doctorRepository.findOne({ where: { id } });
  },

  async searchByName(
    name: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{ doctors: Doctor[]; total: number }> {
    const [doctors, total] = await doctorRepository.findAndCount({
      where: { name: Like(`%${name}%`) },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return { doctors, total };
  },
};
