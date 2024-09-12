export type UserPayload = {
  id?: number;
  name: string;
  email: string;
  password: string;
  birthday: Date;
  address: string;
  createdAt?: Date;
} 