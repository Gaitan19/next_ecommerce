import Filter from "../Filter";
import ProductsGrid from "./ProductsGrid";

const Products = ({ data }: any) => {
  const { user } = JSON.parse(data);

  return (
    <section>
      <div className="container">
        <div className="">
          <Filter />
          <ProductsGrid email={user.email} />
        </div>
      </div>
    </section>
  );
};

export default Products;
