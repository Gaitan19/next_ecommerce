import { ICartDetails } from "@/models/cartDetailsModel";
import { createClient } from "@/utils/supabase/server";
import { cartService } from "./cartService";

const supabase = createClient();

class CartDetailService {
  //   async addToCart(product_id: number): Promise<ICartDetails | void> {
  //     try {
  //       const cart = await cartService.getCart();

  //       const { data: cartProduct } = await supabase
  //         .from("cart_details")
  //         .insert([
  //           {
  //             cart_id: cart.id,
  //             product_id,
  //           },
  //         ])
  //         .select()
  //         .single();

  //       return cartProduct;
  //     } catch (error: any) {
  //       throw new Error(error.message);
  //     }
  //   }

  //   async deleteFromCart(product_id: number): Promise<ICartDetails | void> {
  //     try {
  //       const cart = await cartService.getCart();

  //       const { data: productToDelete } = await supabase
  //         .from("cart_details")
  //         .select()
  //         .match({ product_id, cart_id: cart.id })
  //         .single();

  //       const response = await supabase
  //         .from("cart_details")
  //         .delete()
  //         .eq("id", productToDelete.id);
  //     } catch (error: any) {
  //       throw new Error(error.message);
  //     }
  //   }

  async isCartProduct(
    productName: string,
    email: string
  ): Promise<boolean | any> {
    const cart = await cartService.getCart(email);

    const { data: productData } = await supabase
      .from("products")
      .select()
      .eq("title", productName)
      .single();

    const { data: productsCart, error } = await supabase
      .from("cart_details")
      .select()
      .match({ cart_id: cart.id, product_id: productData.id })
      .single();

    /*
        
        
        `
          id,
          created_at,
          cart_id,
          product_id,
          quantity,
        products(
            id,
            created_at,
            title,
            description,
            price,
            stock,
            category,
            thumbnail,
            
        )
        `

        */

    if (error) return false;

    return true;
  }
}

export const cartDetailsService = new CartDetailService();
