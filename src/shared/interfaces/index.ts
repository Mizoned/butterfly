export * from './auth';
export * from './customers';
export * from './products';
export * from './schedules';
export * from './users';
export * from './menu';

interface ResponseDelete {
  deletedCount: number;
}

interface ResponseError {
  property: string,
  message: string
}

export type {
  ResponseDelete,
  ResponseError
}