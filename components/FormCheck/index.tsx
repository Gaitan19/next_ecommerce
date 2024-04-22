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
        <form>
          {children}

          <div>
            <div>
              <label className="text-md">Email:</label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                defaultValue={email}
                name="email"
                readOnly
              />
            </div>

            <div>
              <label className="text-md" htmlFor="shipping_address">
                Shipping Address:
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="shipping_address"
                placeholder="Shipping Address"
                required
              />
            </div>

            <div>
              <label className="text-md" htmlFor="PaymentMethods">
                Paymenth Methods:
              </label>
              <select
                name="PaymentMethods"
                defaultValue={paymentMethods[0]}
                required
              >
                {renderPaymentMethods()}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 text-center"
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
