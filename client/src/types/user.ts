export type User = {
  id: number;
  first_name: string;
  last_name: string;
  insurance: string;
  email: string;
  birthday: Date;
  address: string;
  createdAt: Date;
  scheine: unknown[];
};

export type UserInput = {
  first_name: string;
  last_name: string;
  insurance: string;
  email: string;
  birthday: Date;
  address: string;
};

export type Users = {
  total: number;
  page: number;
  pageSize: number;
  users: User[];
};
