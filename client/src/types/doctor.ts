export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  email: string;
  createdAt: Date;
};

export type DoctorInput = {
  name: string;
  specialization: string;
  email: string;
};

export type DoctorSearchParams = {
  name?: string;
  specialization?: string;
  page?: number;
  pageSize?: number;
};

export type Doctors = {
  total: number;
  page: number;
  pageSize: number;
  doctors: Doctor[];
};
