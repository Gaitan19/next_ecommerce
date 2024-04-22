import { IProduct } from "@/models/productsModel";
import { productsService } from "@/services/products";
import { TPoducts } from "@/types/types";
import Product from "../Product";
import { filterService } from "@/services/filterService";

const ProductsGrid = async ({ email }: any) => {
  const filter: string = await filterService.getfilter();
  const products: TPoducts = await productsService.getAllProducts(filter);

  const renderProducts = async () => {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {await renderProducts()}
    </div>
  );
};

export default ProductsGrid;
