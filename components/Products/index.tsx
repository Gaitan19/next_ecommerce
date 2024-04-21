
import ProductsGrid from './ProductsGrid';

const Products = ({data}:any) => {


  const { user } = JSON.parse(data);


  return (
    <section>
      <div className="container">
        <ProductsGrid email={user.email} />
      </div>
    </section>
  );
};

export default Products;
