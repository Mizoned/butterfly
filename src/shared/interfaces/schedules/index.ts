import type { ICustomer, IProduct } from '@/shared/interfaces'

export interface ICreateSchedule {
  date: Date;
  timeStart: Date;
  timeEnd: Date;
  customerId: number;
  products: Array<{ id: number; quantity: number }>;
}

export interface ISchedule {
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