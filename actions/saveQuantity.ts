import { cartDetailsService } from "@/services/cartDetailsService";
import { revalidatePath } from "next/cache";

export const handleQuantity = async (formData: FormData) => {
  "use server";

  const productId = formData.get("product") as string;
  const newQuantity = formData.get("newQuantity") as string;

  console.log("productId :>> ", productId);
  cartDetailsService.handleNewQuantity(
    parseInt(productId),
    parseInt(newQuantity)
  );

  revalidatePath("/CartView");
};
