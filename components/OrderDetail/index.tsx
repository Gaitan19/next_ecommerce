'use server';
import { IIProduct, cartDetailsService } from '@/services/cartDetailsService';
import { IDataHistory, logService } from '@/services/logService';
import Image from 'next/image';

const OrderDetail = async ({ orderId }: any) => {
  const orderDetails: IDataHistory = await logService.getLog(parseInt(orderId));

  const products: IIProduct[] = await cartDetailsService.handleGetProducts(
    orderDetails.orders.cart_id
  );

  const renderProducts = () => {
    return products.map((product: IIProduct, index: number) => {
      return (
        <article
          key={product.id}
          className="border-solid border-2 overflow-hidden"
        >
          <Image
            width={200}
            height={200}
            src={product.products.thumbnail}
            alt="product"
          />
          <h3>{product.products.title}</h3>
          <p>{product.products.description}</p>
          <div>
            <span>{product.products.category}</span>
            <span>{product.products.price}</span>
          </div>
        </article>
      );
    });
  };
  //   console.log('orderDetails :>> ', orderDetails);
  return (
    <div>
      <h2>Order Detail</h2>
      <div>
        <span>client: {orderDetails.user.email}</span>

        <span>Address: {orderDetails.orders.shipping_address}</span>

        <span>Payment Method: {orderDetails.orders.payment_method}</span>
      </div>

      <span>Products:</span>

      <div>{renderProducts()}</div>

      <div></div>
    </div>
  );
};

export default OrderDetail;
