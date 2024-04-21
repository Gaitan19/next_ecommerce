// 'use client';
import { v4 } from "uuid";
// import { useContext } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import Image from "next/image";
// import { ecommerceContext } from '@/context/EcommerceContext';
import { tableHeaders } from "@/data/cartViewData";
import { ICartProduct } from "@/models/productsModel";
import { IIProduct, cartDetailsService } from "@/services/cartDetailsService";
import ButtonTrash from "./ButtonTrash";
import { handleDelete } from "@/actions/deleteCartProduct";
import ButtonSaveQuantity from "./ButtonSaveQuantity";
import { handleQuantity } from "@/actions/saveQuantity";

const TableView = async ({ email }: any) => {
  // const { productsCart, deleteProductCart, handleProductQuantity } =
  //   useContext(ecommerceContext);

  const productsCart = await cartDetailsService.getProductsCart(email);

  console.log("productsCart :>> ", productsCart);

  const getTotalFood = (quantity: number, price: number) => quantity * price;

  const handleOnchangeQuantity = (event: any) => {
    const {
      target: { value, id },
    } = event;

    // handleProductQuantity(id, value);
  };

  const renderTableHeaders = () =>
    tableHeaders.map((tableHeader) => (
      <th key={v4()} className="View-table-header">
        {tableHeader}
      </th>
    ));

  const renderTableBody = () =>
    productsCart.map((productCart: IIProduct) => (
      <tr key={productCart.id} className="View-table-rows">
        <td className="View-table-item">
          <ButtonTrash
            action={handleDelete}
            email={email}
            productId={productCart.products.id}
            // onClick={() => deleteProductCart(productCart)}
          >
            <FaRegTrashAlt />
          </ButtonTrash>
        </td>

        <td className="View-table-image">
          <Image
            className="View-image"
            width={92}
            height={92}
            alt={productCart.products.title}
            src={productCart.products.thumbnail}
          />
        </td>

        <td className="View-table-name">{productCart.products.title}</td>
        <td className="View-table-price">{`$${productCart.products.price}`}</td>
        <td className="View-table-quantity">
          Quantity
          <form>
            <input
              className="View-input-quantity"
              id={`${productCart.id}`}
              type="number"
              defaultValue={productCart.quantity}
              min={1}
              name="newQuantity"
              max={productCart.products.stock}
              // onChange={handleOnchangeQuantity}
            />
            <ButtonSaveQuantity
              text="save"
              productId={productCart.id}
              action={handleQuantity}
            />
          </form>
        </td>
        <td>
          ${getTotalFood(productCart.quantity, productCart.products.price)}
        </td>
      </tr>
    ));

  return (
    <div className="View-container-table">
      <table className="View-table">
        <thead className="View-table-headers">
          <tr>{renderTableHeaders()}</tr>
        </thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default TableView;
