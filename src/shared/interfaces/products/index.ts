interface ICreateProduct {
  name: string;
  price: number;
}

interface IProduct extends ICreateProduct {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  additional: {
    priceAtSale: number;
    quantity: number;
  }
}

interface IProductTable extends IProduct {
  lifeTime?: number;
}

export type {
  ICreateProduct,
  IProduct,
  IProductTable
}