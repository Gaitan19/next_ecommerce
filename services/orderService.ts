import { IOrderDto } from "@/models/ordersModel";
import { ICartProduct } from "@/models/productsModel";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

class Orders {
  async saveOrder(products: ICartProduct[], details: IOrderDto): Promise<void> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: order, error } = await supabase
        .from("orders")
        .insert([
          {
            total: details.total,
            shipping_address: details.shipping_address,
            payment_method: details.payment_method,
            order_status: details.order_status,
            user_email: user?.email,
          },
        ])
        .select()
        .single();

      if (error) throw Error("couldn't save order");

      products.forEach(async (product) => {
        const { data: orderProduct, error } = await supabase
          .from("order_details")
          .insert([
            {
              order_id: order.id,
              product_id: product.id,
              quantity: product.quantity,
            },
          ]);
      });

      const { data: orderDetail } = await supabase
        .from("order")
        .select(
          `id, 
        created_at, 
        orderDetails(
            id, 
            product(
                id, 
                created_at,
                title,
                description,
                price,
                stock,
                category,
                thumbnail,
            ),
            quantity
             
        )
        user(
            id,
            created_at,
            email,
            password,
            address,
            tel,
        )
        `
        )
        .eq("id", order.id)
        .single();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getOrder(): Promise<void> {
    const { data: orderDetail } = await supabase
      .from("order")
      .select(
        `id, 
    created_at, 
    orderDetails(
        id, 
        product(
            id, 
            created_at,
            title,
            description,
            price,
            stock,
            category,
            thumbnail,
        ),
        quantity
         
    )
    user(
        id,
        created_at,
        email,
        password,
        address,
        tel,
    )
    `
      )
      .eq("id", 1)
      .single();
  }
}

export const productsService = new Orders();
