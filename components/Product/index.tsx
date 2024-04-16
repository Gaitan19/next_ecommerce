'use client';
import { ecommerceContext } from '@/context/FoodinglyContext';
import { IProduct } from '@/models/productsModel';
import Image from 'next/image';
import { useContext } from 'react';

const Product = ({
  id,
  thumbnail,
  title,
  description,
  category,
  price,
  stock,
  created_at,
}: IProduct) => {
  const { addProductCart, deleteProductCart, productsCart } =
    useContext(ecommerceContext);

  const product: IProduct = {
    id,
    thumbnail,
    title,
    description,
    category,
    price,
    stock,
    created_at,
  };

  const isCartproduct =
    productsCart.some((productCart: IProduct) => productCart.id === id) ||
    false;

  const handleAdd = () => {
    isCartproduct ? deleteProductCart(product) : addProductCart(product);
  };

  return (
    <article className="border-solid border-2 overflow-hidden">
      <Image width={200} height={200} src={thumbnail} alt="product" />
      <h3>
        {id}-{title}
      </h3>
      <p>{description}</p>
      <div>
        <span>{category}</span>
        <span>{stock}</span>
      </div>
      <div>
        <button onClick={handleAdd} className="border-solid border-2">
          {isCartproduct ? 'Delete From Cart' : 'Add To Cart'}
        </button>
        <span>{price}</span>
      </div>
    </article>
  );
};

export default Product;
