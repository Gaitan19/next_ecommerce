import { ICart } from "@/models/cartModel";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

class Cart {
  async getCart(email: string): Promise<ICart> {
    const { data: userData } = await supabase
      .from("user")
      .select()
      .eq("email", email)
      .single();

    console.log("userData :>> ", userData);

    const { data: shoppingCart, error } = await supabase
      .from("shopping_carts")
      .select()
      .eq("user_id", userData.id)
      .order("id", { ascending: false });

    if (error) throw new Error("failed ");

    // isCompleted
    if (shoppingCart?.length === 0) {
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
  }
}

export const cartService = new Cart();
