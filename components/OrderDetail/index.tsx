import { IIProduct, cartDetailsService } from '@/services/cartDetailsService';
import { IDataHistory, logService } from '@/services/logService';
import Image from 'next/image';

const OrderDetail = async ({ orderId }: any) => {
  const orderDetails: IDataHistory = await logService.getLog(parseInt(orderId));
  const products: IIProduct[] | undefined =
    await cartDetailsService.handleGetProducts(orderDetails.orders.cart_id);

  const renderProducts = () => {
    return products?.map((product: IIProduct, index: number) => {
      return (
        <article
          key={product.id}
          className="bg-white border border-gray-300 rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex items-center justify-center mb-4">
            <Image
              width={200}
              height={200}
              src={product.products.thumbnail}
              alt="product"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {product.products.title}
          </h3>
          <p className="text-gray-700 mb-4">{product.products.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{product.products.category}</span>
            <span className="text-gray-600">${product.products.price}</span>
          </div>
        </article>
      );
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 pb-2">
        Order Detail
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="border-b-2 border-gray-300 pb-4 mb-4">
          <span className="block text-lg font-semibold text-gray-900 mb-2">
            Client Information
          </span>
          <span className="block text-gray-800 mb-2">
            Client: {orderDetails.user.email}
          </span>
          <span className="block text-gray-800 mb-2">
            Address: {orderDetails.orders.shipping_address}
          </span>
          <span className="block text-gray-800 mb-2">
            Payment Method: {orderDetails.orders.payment_method}
          </span>
        </div>
        <span className="block text-gray-800 mb-2">
          Total: ${orderDetails.orders.total}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Products:</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && renderProducts()}
      </div>
    </div>
  );
};

export default OrderDetail;
