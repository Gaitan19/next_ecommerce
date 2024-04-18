import { createClient } from '@/utils/supabase/client';
import ProductsGrid from './ProductsGrid';

const Products = () => {
  const supabase = createClient();

  return (
    <section>
      <div className="container">
        <ProductsGrid />
      </div>
    </section>
  );
};

export default Products;
