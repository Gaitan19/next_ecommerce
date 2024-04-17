import HeaderEcommerce from '@/components/HeaderEcommerce';
import TableView from '@/components/TableView';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function cartPage() {
  const cookieStore = cookies();

  const data = cookieStore.get('sb-fcybhjbilfsdcxkomjfk-auth-token');

  if (!data) return redirect('/login');

  return (
    <>
      <HeaderEcommerce value={data.value} />
      <section>
        <div className="container">
          <TableView />
        </div>
      </section>
    </>
  );
}
