import { createClient } from '@/utils/supabase/server';

class Filter {
  async getfilter(): Promise<string> {
    const supabase = createClient();
    try {
      const { data: dataFilter, error } = await supabase
        .from('filters')
        .select()
        .eq('id', 1)
        .single();

      if (error) throw new Error('Failed');

      return dataFilter.active_filter;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateFilter(newFilter: string): Promise<void> {
    const supabase = createClient();
    try {
      const { error } = await supabase
        .from('filters')
        .update({ active_filter: newFilter })
        .eq('id', 1);

      if (error) throw new Error('Failed');
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const filterService = new Filter();
