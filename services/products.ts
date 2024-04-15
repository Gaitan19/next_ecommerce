import { IProduct } from '@/models/productsModel';
import { TPoduct, TPoducts } from '@/types/types';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

class Products {
  async getAllProducts(): Promise<TPoducts> {
    try {
      const { error, data: products } = await supabase
        .from('products')
        .select();

      if (error) {
        return "couldn't read products";
      }

      return products;
    } catch (error: any) {
      return error.message;
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
        return "couldn't read products";
      }
      return product;
    } catch (error: any) {
      return error.message;
    }
  }
}

export const productsService = new Products();
