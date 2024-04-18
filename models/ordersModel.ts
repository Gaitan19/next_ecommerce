import { IUser } from './userModel';

export type TStatusOrder = 'pending' | 'processed' | 'shipped' | 'delivered';
export type TPaymentMethod =
  | 'payment by card'
  | 'paypal'
  | 'payponeer'
  | 'cash on delivery';

export interface IOrderDto {
  total: number;
  shipping_address: string;
  payment_method: TPaymentMethod;
  order_status: TStatusOrder;
}

export interface IOrders extends IOrderDto {
  id: number;
  created_at: Date;
  user_email?: string;
  user: IUser;
}
