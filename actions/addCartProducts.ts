import { cartDetailsService } from "@/services/cartDetailsService";
import { revalidatePath } from "next/cache";

export const handleAdd = async (formData: FormData) => {
  "use server";

  const productId = formData.get("product") as string;
  const isCartProduct = formData.get("isCartProduct") as string;
  const email = formData.get("email") as string;

  isCartProduct === "false"
    ? cartDetailsService.addToCart(parseInt(productId), email)
    : cartDetailsService.deleteFromCart(parseInt(productId), email);

  revalidatePath("/Home");
};
