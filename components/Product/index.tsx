import { IProduct } from '@/models/productsModel';
import Image from 'next/image';

const Product = ({
  id,
  thumbnail,
  title,
  description,
  category,
  price,
  stock,
}: IProduct) => {
  return (
    <article className="border-solid border-2">
      <Image width={200} height={200} src={thumbnail} alt="product" />
      <h3>
        {id}-{title}
      </h3>
      <p>{description}</p>
      <div>
        <span>{category}</span>
        <span>{price}</span>
        <span>{stock}</span>
      </div>
    </article>
  );
};

export default Product;
