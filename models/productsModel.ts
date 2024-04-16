export interface IProduct {
  id: number;
  created_at: Date;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
}

export interface ICartProduct extends IProduct {
  quantity?: number;
}
