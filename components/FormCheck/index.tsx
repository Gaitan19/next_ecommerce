import { saveOrder } from '@/actions/saveOrder';
import { paymentMethods } from '@/data/cartViewData';
import { cartDetailsService } from '@/services/cartDetailsService';

const FormCheck = async ({ email, children }: any) => {
  const productsCart = await cartDetailsService.getProductsCart(email);

  const renderPaymentMethods = () =>
    paymentMethods.map((paymentMethod: string, index: number) => (
      <option key={index} defaultValue={paymentMethod}>
        {paymentMethod}
      </option>
    ));

  return (
    <>
      {productsCart?.length !== 0 && (
        <form className="bg-white rounded-lg shadow-md p-6 border-t-2 border-gray-300">
          {children}

          <div className="mb-6">
            <div className="mb-4">
              <label className="text-md block mb-2">Email:</label>
              <input
                className="rounded-md px-4 py-2 bg-gray-100 border border-gray-300 w-full"
                defaultValue={email}
                name="email"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="text-md block mb-2" htmlFor="shipping_address">
                Shipping Address:
              </label>
              <input
                className="rounded-md px-4 py-2 bg-gray-100 border border-gray-300 w-full"
                name="shipping_address"
                placeholder="Shipping Address"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-md block mb-2" htmlFor="PaymentMethods">
                Payment Methods:
              </label>
              <select
                name="PaymentMethods"
                defaultValue={paymentMethods[0]}
                className="rounded-md px-4 py-2 bg-gray-100 border border-gray-300 w-full"
                required
              >
                {renderPaymentMethods()}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-gray-800 text-white rounded-md px-4 py-2 text-center block mx-auto w-40 hover:bg-gray-700"
            formAction={saveOrder}
          >
            Place Order
          </button>
        </form>
      )}
    </>
  );
};

export default FormCheck;
