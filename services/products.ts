import { IProduct } from '@/models/productsModel';
import { TPoduct, TPoducts } from '@/types/types';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

class Products {
  async getAllProducts(): Promise<TPoducts> {
    try {
      const { error, data: products } = await supabase
        .from('products')
        .select()
        .order('id', { ascending: true });

      if (error) {
        throw new Error("couldn't read products");
      }

      return products;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async sellProduct(id: number, quantity: number): Promise<TPoduct> {
    try {
      const { error, data: product } = await supabase
        .from('products')
        .update({ stock: quantity })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error("couldn't read products");
      }
      return product;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const productsService = new Products();
