import { TPoducts } from '@/types/types';
import Filter from '../Filter';
import ProductsGrid from './ProductsGrid';
import { productsService } from '@/services/products';
import { filterService } from '@/services/filterService';
import Preview from '../Preview';

const Products = async ({ data }: any) => {
  const { user } = JSON.parse(data);

  const filter: string = await filterService.getfilter();

  const products: TPoducts = await productsService.getAllProducts(filter);

  return (
    <section className="w-full mb-16">
      <div className="container">
        <div className="pt-10">
          {products ? (
            <>
              <Filter filter={filter} />
              <ProductsGrid
                email={user.email}
                filter={filter}
                products={products}
              />
            </>
          ) : (
            <Preview />
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
