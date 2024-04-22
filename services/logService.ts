import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

interface IDataUser {
  id: number;
  email: string;
}

interface IDataOrder {
  id: number;
  cart_id: number;
}

export interface IDataHistory {
  id: number;
  user: IDataUser;
  order: IDataOrder;
}

class Log {
  async saveLog(userId: number, orderId: number): Promise<void> {
    try {
      const { error } = await supabase.from("purchase_history").insert([
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
      const { data: historyData, error } = await supabase
        .from("purchase_history")
        .select(
          `
        id,
        user(
            id,
            email
        ),
        orders(
            id,
            cart_id
        )
        `
        )
        .eq("user_id", userId);

      if (error) throw new Error("Failed");
      return historyData as unknown as IDataHistory[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const logService = new Log();
