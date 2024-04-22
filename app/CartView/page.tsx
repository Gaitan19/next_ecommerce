import Cart from '@/components/Cart';
import CheckoutOrder from '@/components/CheckOutOrder';
import FormCheck from '@/components/FormCheck';
import HeaderEcommerce from '@/components/HeaderEcommerce';
import TableView from '@/components/TableView';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CartView',
};

export default function cartPage() {
  const cookieStore = cookies();

  const data = cookieStore.get('sb-fcybhjbilfsdcxkomjfk-auth-token');

  if (!data) return redirect('/login');

  const { user } = JSON.parse(data.value);

  return (
    <>
      <HeaderEcommerce value={data.value} />
      <section className="w-full mb-16">
        <div className="container">
          <Cart user={user} />
        </div>
      </section>
    </>
  );
}
