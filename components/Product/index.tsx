import { IProduct } from '@/models/productsModel';
import { cartDetailsService } from '@/services/cartDetailsService';
import Image from 'next/image';
import ButtonAdd from './ButtonAdd';
import { handleAdd } from '@/actions/addCartProducts';

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
    <article className="border-2 border-gray-200 rounded-lg overflow-hidden  bg-gray-100">
      <div className="overflow-hidden">
        <div className="transform transition-transform duration-300 hover:scale-110">
          <Image
            width={200}
            height={200}
            src={thumbnail}
            alt="product"
            className="object-cover w-full h-48"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 overflow-hidden max-h-28 text-ellipsis whitespace-nowrap max-w-188">
          {title}
        </h3>
        <p className="text-sm text-gray-700 mb-4 overflow-hidden min-h-16 max-h-16">
          {description}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{category}</span>
          <span className="text-sm text-gray-600">stock: {stock}</span>
        </div>
        <div className="flex justify-between items-center">
          {stock > 0 ? (
            <ButtonAdd
              action={handleAdd}
              email={email}
              text={`${isCartProduct ? 'Delete From Cart' : 'Add To Cart'}`}
              isCartProduct={isCartProduct}
              productId={id}
            />
          ) : (
            <span className="text-red-500">No available</span>
          )}
          <span className="text-lg font-semibold">${price}</span>
        </div>
      </div>
    </article>
  );
};

export default Product;
