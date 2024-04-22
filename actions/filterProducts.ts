import { filterService } from "@/services/filterService";
import { revalidatePath } from "next/cache";

export const handleFilterProduct = async (formData: FormData) => {
  "use server";

  const category = formData.get("category") as string;

  await filterService.updateFilter(category);

  revalidatePath("/Home");
};
