import { saveOrder } from '@/actions/saveOrder';
import { paymentMethods } from '@/data/cartViewData';
import { userService } from '@/services/userService';
import { v4 } from 'uuid';

const FormCheck = async () => {
  const user = await userService.getUser();

  const renderPaymentMethods = () =>
    paymentMethods.map((paymentMethod: string) => (
      <div key={v4()} className="Checkout-container-methods">
        <input
          className="Checkout-radio"
          id={paymentMethod}
          type="radio"
          name="PaymentMethods"
          required
        />
        <label className="Checkout-label" htmlFor={paymentMethod}>
          {paymentMethod}
        </label>
      </div>
    ));

  return (
    <form>
      <div>
        <div>
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            value={user.email}
            name="email"
            disabled
          />
        </div>

        <div>
          <label className="text-md" htmlFor="shipping_address">
            Shipping Address
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="shipping_address"
            placeholder="Shipping Address"
            required
          />
        </div>
      </div>

      <div>{renderPaymentMethods()}</div>

      <button
        type="submit"
        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 text-center"
        formAction={saveOrder}
      >
        Place Order
      </button>
    </form>
  );
};

export default FormCheck;
