import { ICart } from "@/models/cartModel";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

class Cart {
  async getCart(): Promise<ICart> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: userData } = await supabase
        .from("user")
        .select()
        .eq("email", user?.email)
        .single();

      const { data: shoppingCart } = await supabase
        .from("shopping_carts")
        .select()
        .eq("user_id", userData.id)
        .order("id", { ascending: false });

      if (!shoppingCart || shoppingCart[0].isCompleted) {
        const { data: newShoppingCart } = await supabase
          .from("shopping_carts")
          .insert([
            {
              user_id: userData.id,
            },
          ])
          .select()
          .single();

        return newShoppingCart;
      }

      return shoppingCart[0];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const cartService = new Cart();
