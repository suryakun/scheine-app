export type Doctor = {
  id: number;
  first_name: string;
  last_name: string;
  specialization: string;
  email: string;
  doctor_number: string;
  createdAt: Date;
};

export type DoctorInput = {
  first_name: string;
  last_name: string;
  specialization: string;
  email: string;
  doctor_number: string;
};

export type DoctorSearchParams = {
  name: string;
};

export type Doctors = {
  total: number;
  page: number;
  pageSize: number;
  doctors: Doctor[];
};
