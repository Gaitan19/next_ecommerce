import { revalidatePath } from "next/cache";

export const handleAdd = async (formData: FormData) => {
  "use server";

  // isCartproduct ? deleteProductCart(product) : addProductCart(product);

  console.log("hola");

  revalidatePath("/Home");
};
