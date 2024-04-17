'use client';
import {
  CCloseButton,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
} from '@coreui/react';
import Image from 'next/image';
import { FaTrashAlt } from 'react-icons/fa';
import { useContext } from 'react';
import { ecommerceContext } from '@/context/EcommerceContext';
import { ICartProduct } from '@/models/productsModel';
import Link from 'next/link';
import { routes } from '@/data/routes';

const ShopCart = () => {
  const {
    productsCart,
    deleteProductCart,
    getTotalPrice,
    visibleCart,
    setVisibleCart,
  } = useContext(ecommerceContext);

  const renderCartProducts = () => {
    return productsCart.map((cartProduct: ICartProduct) => {
      return (
        <li className="" key={cartProduct.id}>
          <Image
            width={100}
            height={100}
            priority
            alt="cart product"
            src={cartProduct.thumbnail}
            className=""
          />
          <div className="">
            <span className="">{cartProduct.title}</span>
            <span className="">{`${cartProduct.quantity} x $${cartProduct.price}`}</span>
          </div>
          <button onClick={() => deleteProductCart(cartProduct)}>
            <FaTrashAlt />
          </button>
        </li>
      );
    });
  };

  return (
    <COffcanvas
      placement="end"
      visible={visibleCart}
      onHide={() => setVisibleCart(false)}
      className=""
    >
      <COffcanvasHeader>
        <COffcanvasTitle className="">{`MY CART (${productsCart.length})`}</COffcanvasTitle>
        <CCloseButton className="" onClick={() => setVisibleCart(false)} />
      </COffcanvasHeader>
      <COffcanvasBody>
        <div className="">
          <ul className="">{renderCartProducts()}</ul>
          <div className="">
            <div className="">
              <span className="">subtotal</span>
              <span className="">{`$ ${getTotalPrice()}`}</span>
            </div>
          </div>
          <Link href={routes.cartView}>
            <span className="">Go to Cart</span>
          </Link>
        </div>
      </COffcanvasBody>
    </COffcanvas>
  );
};

export default ShopCart;
