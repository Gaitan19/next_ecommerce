import { createClient } from '@/utils/supabase/server';

interface IDataUser {
  id: number;
  email: string;
}

interface IDataOrder {
  id: number;
  cart_id: number;
  shipping_address: string;
  payment_method: string;
  order_status: string;
}

export interface IDataHistory {
  id: number;
  user: IDataUser;
  orders: IDataOrder;
}

class Log {
  async saveLog(userId: number, orderId: number): Promise<void> {
    try {
      const supabase = createClient();

      const { error } = await supabase.from('purchase_history').insert([
        {
          user_id: userId,
          order_id: orderId,
        },
      ]);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getLogs(userId: number): Promise<IDataHistory[]> {
    try {
      const supabase = createClient();

      const { data: historyData, error } = await supabase
        .from('purchase_history')
        .select(
          `
        id,
        user(
            id,
            email
        ),
        orders(
            id,
            cart_id,
            shipping_address,
            payment_method,
            order_status      
            )
        `
        )
        .eq('user_id', userId);

      if (error) throw new Error('Failed');
      return historyData as unknown as IDataHistory[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getLog(logId: number): Promise<IDataHistory> {
    try {
      const supabase = createClient();

      const { data: historyData, error } = await supabase
        .from('purchase_history')
        .select(
          `
        id,
        user(
            id,
            email
        ),
        orders(
            id,
            cart_id,
            shipping_address,
            payment_method,
            order_status      
            )
        `
        )
        .eq('id', logId)
        .single();

      if (error) throw new Error('Failed');
      return historyData as unknown as IDataHistory;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const logService = new Log();
