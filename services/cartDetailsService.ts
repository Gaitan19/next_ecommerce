import { IProduct } from '@/models/productsModel';
import { ICartDetails } from '@/models/cartDetailsModel';
import { createClient } from '@/utils/supabase/server';
import { cartService } from './cartService';
import { ICart } from '@/models/cartModel';

export interface IIProduct {
  id: number;
  products: IProduct;
  quantity: number;
}

class CartDetailService {
  async addToCart(
    product_id: number,
    email: string
  ): Promise<ICartDetails | void> {
    const supabase = createClient();
    try {
      const cart = await cartService.getCart(email);

      if (!cart) throw new Error('Failed');

      const { data: cartProduct } = await supabase
        .from('cart_details')
        .insert([
          {
            cart_id: cart.id,
            product_id,
          },
        ])
        .select()
        .single();

      return cartProduct;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteFromCart(
    product_id: number,
    email: string
  ): Promise<ICartDetails | void> {
    const supabase = createClient();
    try {
      const cart = await cartService.getCart(email);

      if (!cart) throw new Error('Failed');

      const { data: productToDelete } = await supabase
        .from('cart_details')
        .select()
        .match({ product_id, cart_id: cart.id })
        .single();

      const response = await supabase
        .from('cart_details')
        .delete()
        .eq('id', productToDelete.id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async isCartProduct(
    productName: string,
    email: string
  ): Promise<boolean | void> {
    const supabase = createClient();

    const cart = await cartService.getCart(email);

    if (cart) {
      const { data: productData } = await supabase
        .from('products')
        .select()
        .eq('title', productName)
        .single();

      const { data: productsCart, error } = await supabase
        .from('cart_details')
        .select()
        .match({ cart_id: cart.id, product_id: productData.id })
        .single();

      if (error) return false;

      return true;
    }
  }

  async handleGetProducts(
    cart_id: number | undefined
  ): Promise<IIProduct[] | undefined> {
    const supabase = createClient();
    try {
      const { data: productCarts } = await supabase
        .from('shopping_carts')
        .select(
          `
          id,
          created_at,
          cart_details(
            id,
            quantity,
            products(
              id,
              created_at,
              title,
              description,
              price,
              stock,
              category,
              thumbnail
            )
          )
          `
        )
        .eq('id', cart_id)
        .single();

      if (!productCarts) return undefined;

      const { cart_details } = productCarts;

      const dataCartDetails = cart_details.sort(
        (a: any, b: any) => a.id - b.id
      );

      return dataCartDetails as unknown as IIProduct[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductsCart(email: string): Promise<IIProduct[] | undefined> {
    try {
      const cart: ICart | undefined = await cartService.getCart(email);

      const dataCartDetails = await this.handleGetProducts(cart?.id);

      return dataCartDetails as unknown as IIProduct[];
    } catch (error: any) {
      // throw new Error(error.message);
      console.log(error.message);
    }
  }

  async handleNewQuantity(
    productId: number,
    newQuantity: Number
  ): Promise<void> {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('cart_details')
        .update({ quantity: newQuantity })
        .eq('id', productId)
        .select();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const cartDetailsService = new CartDetailService();
