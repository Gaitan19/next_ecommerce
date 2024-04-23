import { IIProduct, cartDetailsService } from '@/services/cartDetailsService';
import { v4 } from 'uuid';

const CheckoutOrder = async ({ email }: any) => {
  const productsCart = await cartDetailsService.getProductsCart(email);

  const getTotalFood = (quantity: number, price: number) => quantity * price;

  let total = 0;

  const renderOrders = () =>
    productsCart?.map((product: IIProduct) => {
      total += getTotalFood(product.quantity, product.products.price);
      return (
        <div key={v4()} className="flex justify-between items-center py-2">
          <span className="text-gray-800">{`${product.products.title} x ${product.quantity}`}</span>
          <span className="text-gray-800">{`$${getTotalFood(
            product.quantity,
            product.products.price
          )}`}</span>
        </div>
      );
    });

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 border-t-2 border-gray-300 mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Order</h3>
      <div className="space-y-2 max-h-[344px] overflow-auto">
        {productsCart && renderOrders()}
      </div>
      <div className="flex justify-between items-center mt-4 bg-gray-200 rounded-md p-3">
        <span className="text-gray-800">Total Amount</span>
        <span className="text-gray-800">${total}</span>
        <input className="hidden" defaultValue={total} name="totalValue" />
      </div>
    </div>
  );
};

export default CheckoutOrder;
