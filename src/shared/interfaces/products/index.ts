interface ICreateProduct {
  name: string;
  price: number;
}

interface IProduct extends ICreateProduct {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  details: {
    priceAtSale: number;
    quantity: number;
  }
}

interface ITotalProducts {
  newTotalCount: number;
  totalCount: number;
}

interface IProductPerformance {
  name: string;
  income: number;
  count: number;
}

interface IProductSummaryStatistics {
  totalProducts: ITotalProducts;
  popularProduct: IProductPerformance;
  profitableProduct: IProductPerformance;
}

interface IPerDay {
  day: number;
  count: number;
}

interface IProfitableProduct {
  product: IProduct;
  totalRevenue: number;
  totalRevenuePercent: number;
}

interface IProductOverviewStatistics {
  profitableProducts: {
    products: IProfitableProduct[];
    totalRevenue: number;
  },
  servicesCountPerDay: IPerDay[];
  totalProducts: ITotalProducts;
  popularProduct: IProductPerformance;
  profitableProduct: IProductPerformance;
}

export type {
  ICreateProduct,
  IProduct,
  ITotalProducts,
  IProductPerformance,
  IProfitableProduct,
  IPerDay,
  IProductSummaryStatistics,
  IProductOverviewStatistics
}