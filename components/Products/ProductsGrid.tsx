import { IProduct } from '@/models/productsModel';
import { productsService } from '@/services/products';
import { TPoducts } from '@/types/types';
import { alertMessage } from '../Alert';

const ProductsGrid = async () => {
  const products: TPoducts = await productsService.getAllProducts();

  const renderProducts = () => {
    if (Array.isArray(products)) {
      return products.map((product: IProduct) => {
        return <div key={product.id}></div>;
      });
    } else {
      return alertMessage.error(products);
    }
  };

  return <div></div>;
};

export default ProductsGrid;
