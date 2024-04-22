import { cartDetailsService } from '@/services/cartDetailsService';
import CheckoutOrder from '../CheckOutOrder';
import FormCheck from '../FormCheck';
import TableView from '../TableView';
import Preview from '../Preview';

const Cart = async ({ user }: any) => {
  const productsCart = await cartDetailsService.getProductsCart(user.email);

  return (
    <div className="wrapper flex flex-col gap-40">
      {productsCart?.length !== 0 ? (
        <>
          <TableView email={user.email} productsCart={productsCart} />
          <div>
            <FormCheck email={user.email}>
              <CheckoutOrder email={user.email} />
            </FormCheck>
          </div>
        </>
      ) : (
        <Preview />
      )}
    </div>
  );
};

export default Cart;
