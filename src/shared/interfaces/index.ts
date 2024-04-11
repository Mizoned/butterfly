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

export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export interface IProductTable extends IProduct {
  lifeTime?: number;
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  fatherName: string;
  mobilePhone: string;
  email: string;
}

export interface ICustomerTable extends ICustomer {
  lifeTime?: number;
  visits?: number;
}

export interface ResponseError {
  property: string,
  message: string
}