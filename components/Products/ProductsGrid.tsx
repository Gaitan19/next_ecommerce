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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {await renderProducts()}
    </div>
  );
};

export default ProductsGrid;
