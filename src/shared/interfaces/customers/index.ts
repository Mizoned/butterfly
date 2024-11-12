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

interface IActiveCustomer {
  customer: ICustomer;
  visits: number;
}

interface ITotalCustomers {
  newTotalCount: number;
  totalCount: number;
}

interface ITotalVisits {
  newTotalCount: number;
  totalCount: number;
}

interface IProfitableCustomer {
  customer: ICustomer;
  totalRevenue: number;
}

interface IProfitableCustomers {
  customers: IProfitableCustomer[];
  totalRevenue: number;
}

interface IUntrustedCustomers {
  customer: ICustomer;
  totalCanceled: number;
}

interface ICustomerSummaryStatistics {
  totalCustomers: ITotalCustomers;
  activeCustomer: IActiveCustomer;
  totalVisits: ITotalVisits;
}

interface ICustomerOverviewStatistics {
  profitableCustomers: IProfitableCustomers;
  untrustedCustomers: IUntrustedCustomers[];
  totalCustomers: ITotalCustomers;
  activeCustomer: IActiveCustomer;
  totalVisits: ITotalVisits;
}

export type {
  ICreateCustomer,
  ICustomer,
  ITotalCustomers,
  ITotalVisits,
  IActiveCustomer,
  IProfitableCustomers,
  IUntrustedCustomers,
  ICustomerSummaryStatistics,
  ICustomerOverviewStatistics
}