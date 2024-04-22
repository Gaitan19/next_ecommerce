import { v4 } from 'uuid';
import { FaRegTrashAlt } from 'react-icons/fa';
import Image from 'next/image';
import { tableHeaders } from '@/data/cartViewData';
import { IIProduct } from '@/services/cartDetailsService';
import ButtonTrash from './ButtonTrash';
import { handleDelete } from '@/actions/deleteCartProduct';
import ButtonSaveQuantity from './ButtonSaveQuantity';
import { handleQuantity } from '@/actions/saveQuantity';

const TableView = async ({ email, productsCart }: any) => {
  const getTotalFood = (quantity: number, price: number) => quantity * price;

  const renderTableHeaders = () =>
    tableHeaders.map((tableHeader) => (
      <th
        key={v4()}
        className="py-2 px-4 text-gray-800 font-semibold bg-gray-200 border-b border-gray-300"
      >
        {tableHeader}
      </th>
    ));

  const renderTableBody = () =>
    productsCart?.map((productCart: IIProduct) => (
      <tr key={productCart.id} className="border-b border-gray-200">
        <td className="py-3 px-4">
          <div className="flex items-center justify-center">
            <ButtonTrash
              action={handleDelete}
              email={email}
              productId={productCart.products.id}
            >
              <FaRegTrashAlt className="text-gray-500" />
            </ButtonTrash>
          </div>
        </td>

        <td className="py-3 px-4">
          <div className="flex items-center">
            <div className="w-16 h-16 mr-4 flex items-center justify-center">
              <Image
                className="rounded-lg"
                width={64}
                height={64}
                alt={productCart.products.title}
                src={productCart.products.thumbnail}
              />
            </div>
            <span className="text-gray-800">{productCart.products.title}</span>
          </div>
        </td>

        <td className="py-3 px-4 text-gray-800">
          ${productCart.products.price}
        </td>

        <td className="py-3 px-4">
          <form className="flex items-center">
            <input
              className="w-16 py-1 px-2 text-gray-800 border border-gray-300 rounded-md mr-2"
              id={`${productCart.id}`}
              type="number"
              defaultValue={productCart.quantity}
              min={1}
              name="newQuantity"
              max={productCart.products.stock}
            />
            <ButtonSaveQuantity
              text="save"
              productId={productCart.id}
              action={handleQuantity}
            />
          </form>
        </td>

        <td className="py-3 px-4 text-gray-800">
          ${getTotalFood(productCart.quantity, productCart.products.price)}
        </td>
      </tr>
    ));

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {productsCart?.length !== 0 && (
        <table className="w-full">
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      )}
    </div>
  );
};

export default TableView;
