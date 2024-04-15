interface ICreateProduct {
  name: string;
  price: number;
}

interface IProduct extends ICreateProduct {
  id: number;
}

interface IProductTable extends IProduct {
  lifeTime?: number;
}

export {
  ICreateProduct,
  IProduct,
  IProductTable
}