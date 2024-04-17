export { ICustomer, ICreateCustomer, ICustomerTable } from "./customers";
export { IProduct, ICreateProduct, IProductTable } from "./products";
export { ISchedule, ICreateSchedule } from "./schedules";

export interface IUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  fatherName: string | null;
  mobilePhone: string | null;
  email: string;
}

export interface JwtPayloadUser extends IUser {
  exp: number;
  iat: number;
}


export interface ResponseDelete {
  deletedCount: number;
}
export interface ResponseError {
  property: string,
  message: string
}
