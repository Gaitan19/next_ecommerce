'use client';
import { ecommerceContext } from '@/context/EcommerceContext';
import { ICartProduct } from '@/models/productsModel';
import { useContext } from 'react';
import { v4 } from 'uuid';

const CheckoutOrder = () => {
  const { productsCart, getTotalPrice } = useContext(ecommerceContext);

  const getTotalFood = (quantity: number, price: number) => quantity * price;

  const renderOrders = () =>
    productsCart.map((product: ICartProduct) => (
      <div key={v4()} className="Checkout-orders">
        <span>{`${product.title} x ${product.quantity}`}</span>
        <span>{`$${getTotalFood(product.quantity, product.price)}`}</span>
      </div>
    ));

  return (
    <div className="Checkout-box">
      <h3 className="Checkout-title Checkout-box-title">Your Order</h3>
      <div className="Checkout-container-orders">{renderOrders()}</div>
      <div className="Checkout-orders">
        <span>Total Amount</span>
        <span>${getTotalPrice()}</span>
      </div>
    </div>
  );
};

export default CheckoutOrder;
