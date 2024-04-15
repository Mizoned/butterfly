interface ICreateCustomer {
  firstName: string;
  lastName: string;
  fatherName?: string;
  mobilePhone: string;
  email?: string;
}

interface ICustomer extends ICreateCustomer {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface ICustomerTable extends ICustomer {
  lifeTime?: number;
  visits?: number;
}

export {
  ICreateCustomer,
  ICustomer,
  ICustomerTable
}