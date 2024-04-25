import type { ICustomer, IProduct } from '@/shared/interfaces'

interface ICreateSchedule {
  date: Date;
  timeStart: Date;
  timeEnd: Date;
  customerId: number;
  products: Array<{ id: number; quantity: number }>;
}

interface ISchedule {
  id: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  userId: number;
  customerId: number;
  createdAt: string;
  updatedAt: string;
  customer: ICustomer;
  products: IProduct[];
}

export type {
  ICreateSchedule,
  ISchedule
}