import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

class Filter {
  async getfilter(): Promise<string> {
    try {
      const { data: dataFilter, error } = await supabase
        .from("filters")
        .select()
        .eq("id", 1)
        .single();

      if (error) throw new Error("Failed");

      return dataFilter.active_filter;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateFilter(newFilter: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("filters")
        .update({ active_filter: newFilter })
        .eq("id", 1);

      if (error) throw new Error("Failed");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const filterService = new Filter();
