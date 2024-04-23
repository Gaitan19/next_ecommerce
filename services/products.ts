import { IProduct } from '@/models/productsModel';
import { TPoduct, TPoducts } from '@/types/types';
import { createClient } from '@/utils/supabase/server';
import { userService } from './userService';
import { cartDetailsService } from './cartDetailsService';

interface Product {
  id: number;
  price: number;
  stock: number;
  title: string;
  category: string;
  thumbnail: string;
  created_at: Date;
  description: string;
}

interface CartItem {
  id: number;
  products: Product;
  quantity: number;
}

class Products {
  async getProductsFilter(filter: string): Promise<TPoducts> {
    try {
      const supabase = createClient();
      const { error, data: products } = await supabase
        .from('products')
        .select()
        .eq('category', filter)
        .order('id', { ascending: true });

      if (error) {
        throw new Error("couldn't read products");
      }

      return products;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAProducts(): Promise<TPoducts> {
    try {
      const supabase = createClient();
      const { error, data: products } = await supabase
        .from('products')
        .select()
        .order('id', { ascending: true });

      if (error) {
        // throw new Error("couldn't read products");

        console.log('error :>> ', error);
      }

      return products as TPoducts;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getAllProducts(filter: string): Promise<TPoducts> {
    try {
      const products =
        filter === 'all'
          ? await this.getAProducts()
          : await this.getProductsFilter(filter);

      return products as TPoducts;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async sellProduct(id: number, newStock: number): Promise<TPoduct> {
    try {
      const supabase = createClient();
      const { error, data: product } = await supabase
        .from('products')
        .update({ stock: newStock })
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

  async mostRepeatedCategory(array: CartItem[]): Promise<string> {
    const count: { [category: string]: number } = {};

    array.forEach((item) => {
      const category = item.products.category;
      count[category] = (count[category] || 0) + 1;
    });

    const mostRepeatedCategory = Object.entries(count).reduce(
      (a, b) => (b[1] > a[1] ? b : a),
      [null as unknown as string, 0]
    );
    return mostRepeatedCategory[0];
  }

  async getRecommendations(): Promise<TPoducts | null> {
    const supabase = createClient();

    const user = await userService.getUser();

    const { data: dataOrder, error } = await supabase
      .from('orders')
      .select()
      .eq('user_id', user.id)
      .order('id', { ascending: false });

    if (error) {
      throw new Error("couldn't read products");
    }

    const dataProducts = await cartDetailsService.handleGetProducts(
      dataOrder[0]?.cart_id
    );

    if (dataProducts) {
      const mostRepeatedCategory = await this.mostRepeatedCategory(
        dataProducts
      );

      const { data: recomendedProducts } = await supabase
        .from('products')
        .select()
        .eq('category', mostRepeatedCategory)
        .limit(3);

      if (!recomendedProducts) return null;

      return recomendedProducts;
    }

    return null;
  }
}

export const productsService = new Products();
