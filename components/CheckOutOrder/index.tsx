import { ICartProduct } from '@/models/productsModel';
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
        <div key={v4()} className="Checkout-orders">
          <span>{`${product.products.title} x ${product.quantity}`}</span>
          <span>{`$${getTotalFood(
            product.quantity,
            product.products.price
          )}`}</span>
        </div>
      );
    });

  return (
    <div className="Checkout-box">
      <h3 className="Checkout-title Checkout-box-title">Your Order</h3>
      <div className="Checkout-container-orders">
        {productsCart && renderOrders()}
      </div>
      <div className="Checkout-orders">
        <span>Total Amount</span>
        <span>${total}</span>
        <input className="hidden" defaultValue={total} name="totalValue" />
      </div>
    </div>
  );
};

export default CheckoutOrder;
