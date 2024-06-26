import { IOrderDto } from '@/models/ordersModel';
import { ICartProduct } from '@/models/productsModel';
import { createClient } from '@/utils/supabase/server';
import { cartService } from './cartService';
import { IIProduct, cartDetailsService } from './cartDetailsService';
import { productsService } from './products';
import { logService } from './logService';

class Orders {
  async handleSaveOrder(
    userId: number,
    userEmail: string,
    address: string,
    paymentMethod: string,
    total: number
  ): Promise<void> {
    try {
      const supabase = createClient();
      const cart = await cartService.getCart(userEmail);
      if (!cart) throw new Error('failed');

      const { data: orderData, error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: userId,
            cart_id: cart.id,
            total,
            shipping_address: address,
            payment_method: paymentMethod,
          },
        ])
        .select()
        .single();

      if (error) throw new Error('Failed');

      logService.saveLog(userId, orderData.id);

      const productsOnOrder = await cartDetailsService.getProductsCart(
        userEmail
      );

      if (productsOnOrder) {
        productsOnOrder.forEach(async (productOrder: IIProduct) => {
          await productsService.sellProduct(
            productOrder.products.id,
            productOrder.products.stock - productOrder.quantity
          );
        });
      }

      const { data: newCart } = await supabase
        .from('shopping_carts')
        .insert([{ user_id: userId }])
        .select()
        .single();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const orderService = new Orders();
