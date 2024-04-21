import { IProduct } from "@/models/productsModel";
import { cartDetailsService } from "@/services/cartDetailsService";
import Image from "next/image";
import ButtonAdd from "./ButtonAdd";
import { handleAdd } from "@/actions/addCartProducts";

interface IIProducts extends IProduct {
  email: string;
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
  email,
}: IIProducts) => {
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

  const isCartProduct = await cartDetailsService.isCartProduct(title, email);

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
        <ButtonAdd
          action={handleAdd}
          email={email}
          text={`${isCartProduct ? "Delete From Cart" : "Add To Cart"}`}
          isCartProduct={isCartProduct}
          productId={id}
        />
        <span>{price}</span>
      </div>
    </article>
  );
};

export default Product;
