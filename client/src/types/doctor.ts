export type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
};

export type DoctorInput = {
  firstName: string;
  lastName: string;
  specialization: string;
  email: string;
  phoneNumber: string;
};

export type DoctorSearchParams = {
  name?: string;
  specialization?: string;
  page?: number;
  pageSize?: number;
};
