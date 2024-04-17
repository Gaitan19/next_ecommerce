'use client';
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { IProduct } from '@/models/productsModel';

const defaultContextValue = {
  visibleCart: false,
  setVisibleCart: (value: boolean) => {},
  productsCart: [],
  addProductCart: (product: IProduct) => {},
  deleteProductCart: (product: IProduct) => {},
  handleProductQuantity: (id: any, value: any) => {},
  getTotalPrice: () => 0,
};

const ecommerceContext = createContext(defaultContextValue);

const EcommerceContext = ({ children }: { children: React.ReactNode }) => {
  const [visibleCart, setVisibleCart] = useState(false);
  const [productsCart, setProductsCart] = useLocalStorage('productsCartE', []);

  const addProductCart = (product: IProduct) => {
    const newCartProduct = { ...product, quantity: 1 };

    setProductsCart([...productsCart, newCartProduct]);
  };

  const deleteProductCart = (product: IProduct) => {
    const filterProducts = productsCart.filter(
      (productCart: IProduct) => productCart.id !== product.id
    );

    setProductsCart(filterProducts);
  };

  const handleProductQuantity = (id: any, value: any) => {
    const tempProducts = [...productsCart];
    const productIndex = tempProducts.findIndex(
      (product) => product.id === parseInt(id, 10)
    );

    console.log(productIndex);
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
