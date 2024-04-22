import { cartDetailsService } from "@/services/cartDetailsService";
import { revalidatePath } from "next/cache";

export const handleDelete = async (formData: FormData) => {
  "use server";

  const productId = formData.get("product") as string;
  const email = formData.get("email") as string;

  cartDetailsService.deleteFromCart(parseInt(productId), email);

  revalidatePath("/CartView");
};
