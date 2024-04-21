// import { ecommerceContext } from '@/context/EcommerceContext';
// import { handleAdd } from '@/actions/addCartProducts';
import { IProduct } from '@/models/productsModel';
import { cartDetailsService } from '@/services/cartDetailsService';
// import { cartDetailsService } from '@/services/cartDetailsService';
import Image from 'next/image';
import ButtonAdd from './ButtonAdd';
import { handleAdd } from '@/actions/addCartProducts';
// import { useContext } from 'react';

interface IIProducts extends IProduct{
  email:string
}

const Product = async ({
  id,
  thumbnail,
  title,
  description,
  category,
  price,
  stock,
  created_at,
  email
}: IIProducts) => {
  // const { addProductCart, deleteProductCart, productsCart } =
  //   useContext(ecommerceContext);
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


  

  // const productsCart = await cartDetailsService.getProductsCart()

  const isCartProduct = await cartDetailsService.isCartProduct(title,email)


  // const isCartproduct =
  //   productsCart.some((productCart: IProduct) => productCart.id === id) ||
  //   false;

  // const isCartproduct = false;

  // const handleAdd =  () => {
  
  //   // isCartproduct ? deleteProductCart(product) : addProductCart(product);
  
  //   console.log("hola");
  // };
  

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
        {/* formAction={handleAdd} */}
        <ButtonAdd action={handleAdd} email={email} text={`${isCartProduct ? "Delete From Cart" : "Add To Cart"}`} isCartProduct={isCartProduct} productId={id}/>
          {/* {isCartproduct ? 'Delete From Cart' : 'Add To Cart'} */}
       


          {/* <button onClick={handleAdd} className="border-solid border-2"> */}
          {/* {isCartproduct ? 'Delete From Cart' : 'Add To Cart'} */}
        {/* add */}
        {/* </button> */}

        <span>{price}</span>
      </div>
    </article>
  );
};

export default Product;
