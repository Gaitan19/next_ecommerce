'use client';
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '@/hooks/useLocalStorage';

const defaultContextValue = {
  visibleCart: false,
  setVisibleCart: (value: boolean) => {},
  productsCart: [],
  addProductCart: (product: any) => {},
  deleteProductCart: (product: { name: any }) => {},
  handleProductQuantity: (id: any, value: any) => {},
  getTotalPrice: () => 0,
};

const ecommerceContext = createContext(defaultContextValue);

const EcommerceContext = ({ children }: { children: React.ReactNode }) => {
  const [visibleCart, setVisibleCart] = useState(false);
  const [productsCart, setProductsCart] = useLocalStorage('productsCart', []);

  const addProductCart = (product: any) => {
    const newCartProduct = { ...product, quantity: 1 };

    setProductsCart([...productsCart, newCartProduct]);
  };

  const deleteProductCart = (product: { name: any }) => {
    const filterProducts = productsCart.filter(
      (productCart: { name: any }) => productCart.name !== product.name
    );

    setProductsCart(filterProducts);
  };

  const handleProductQuantity = (id: any, value: any) => {
    const tempProducts = [...productsCart];
    const productIndex = tempProducts.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
      tempProducts[productIndex].quantity = value;
      setProductsCart(tempProducts);
    }
  };

  const getTotalPrice = () =>
    productsCart.reduce(
      (total: number, product: { price: number; quantity: number }) =>
        total + product.price * product.quantity,
      0
    );

  return (
    <ecommerceContext.Provider
      value={{
        visibleCart,
        setVisibleCart,
        productsCart,
        addProductCart,
        deleteProductCart,
        handleProductQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </ecommerceContext.Provider>
  );
};

EcommerceContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export { EcommerceContext, ecommerceContext };
