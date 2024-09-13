import api from '../lib/api';

import { Doctor, DoctorInput, DoctorSearchParams } from '@/types/doctor';

export const doctorService = {
  async fetchDoctor(id: string): Promise<Doctor> {
    const response = await api.get<Doctor>(`/doctors/${id}`);
    return response.data;
  },

  async fetchDoctors(
    params: DoctorSearchParams = {},
  ): Promise<{ doctors: Doctor[]; total: number }> {
    const response = await api.get<{ doctors: Doctor[]; total: number }>('/doctors', { params });
    return response.data;
  },

  async createDoctor(doctorData: DoctorInput): Promise<Doctor> {
    const response = await api.post<Doctor>('/doctors', doctorData);
    return response.data;
  },

  async updateDoctor(id: string, doctorData: Partial<DoctorInput>): Promise<Doctor> {
    const response = await api.put<Doctor>(`/doctors/${id}`, doctorData);
    return response.data;
  },

  async searchDoctors(params: DoctorSearchParams): Promise<{ doctors: Doctor[]; total: number }> {
    const response = await api.get<{ doctors: Doctor[]; total: number }>('/doctors/search', {
      params,
    });
    return response.data;
  },

  async deleteDoctor(id: string): Promise<void> {
    await api.delete(`/doctors/${id}`);
  },
};
