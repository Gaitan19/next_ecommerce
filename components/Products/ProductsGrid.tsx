import { IProduct } from '@/models/productsModel';
import { productsService } from '@/services/products';
import { TPoducts } from '@/types/types';
import { alertMessage } from '../Alert';
import Image from 'next/image';
import Product from '../Product';

const ProductsGrid = async () => {
  const renderProducts = async () => {
    try {
      const products: TPoducts = await productsService.getAllProducts();
      return products.map((product: IProduct) => {
        return (
          // <article key={product.id} className="border-solid border-2">
          //   <Image
          //     width={200}
          //     height={200}
          //     src={product.thumbnail}
          //     alt="product"
          //   />
          //   <h3>
          //     {product.id}-{product.title}
          //   </h3>
          //   <p>{product.description}</p>
          //   <div>
          //     <span>{product.category}</span>
          //     <span>{product.price}</span>
          //     <span>{product.stock}</span>
          //   </div>
          // </article>

          <Product
            id={product.id}
            title={product.title}
            category={product.category}
            created_at={product.created_at}
            description={product.description}
            price={product.price}
            stock={product.stock}
            thumbnail={product.thumbnail}
            key={product.id}
          />
        );
      });
    } catch (error: any) {
      alertMessage.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {await renderProducts()}
    </div>
  );
};

export default ProductsGrid;
