import { orderService } from "@/services/orderService";
import { userService } from "@/services/userService";
import { revalidatePath } from "next/cache";

export const saveOrder = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const paymentMethod = formData.get("PaymentMethods") as string;
  const shippingAddress = formData.get("shipping_address") as string;
  const totalValue = formData.get("totalValue") as string;

  const userData = await userService.getUser();

  await orderService.handleSaveOrder(
    userData.id,
    email,
    shippingAddress,
    paymentMethod,
    parseInt(totalValue)
  );

  revalidatePath("/CartView");
};
