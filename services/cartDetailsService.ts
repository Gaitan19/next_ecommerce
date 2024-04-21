import { ICartDetails } from "@/models/cartDetailsModel";
import { createClient } from "@/utils/supabase/server";
import { cartService } from "./cartService";

const supabase = createClient();

class CartDetailService {
  async addToCart(product_id: number): Promise<ICartDetails | void> {
    try {
      const cart = await cartService.getCart();

      const { data: cartProduct } = await supabase
        .from("cart_details")
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

  async deleteFromCart(product_id: number): Promise<ICartDetails | void> {
    try {
      const cart = await cartService.getCart();

      const { data: productToDelete } = await supabase
        .from("cart_details")
        .select()
        .match({ product_id, cart_id: cart.id })
        .single();

      const response = await supabase
        .from("cart_details")
        .delete()
        .eq("id", productToDelete.id);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getProductsCart(): Promise<ICartDetails[] | void> {
    try {
      const cart = await cartService.getCart();

      const { data: productsCart } = await supabase
        .from("cart_details")
        .select()
        .eq("cart_id", cart.id);

      return productsCart as ICartDetails[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const cartDetailsService = new CartDetailService();
