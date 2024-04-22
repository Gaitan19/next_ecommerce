import { IProduct } from '@/models/productsModel';
import Product from '../Product';

const ProductsGrid = async ({ email, filter, products }: any) => {
  const renderProducts = () => {
    return products.map((product: IProduct, index: number) => {
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
          email={email}
        />
      );
    });
  };

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-h-[884px] overflow-auto">
      {products && renderProducts()}
    </div>
  );
};

export default ProductsGrid;
