import HeaderEcommerce from '@/components/HeaderEcommerce';
import OrderDetail from '@/components/OrderDetail';
import { IIProduct, cartDetailsService } from '@/services/cartDetailsService';
import { IDataHistory, logService } from '@/services/logService';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();

  const data = cookieStore.get('sb-fcybhjbilfsdcxkomjfk-auth-token');

  if (!data) return redirect('/login');

  return (
    <>
      <HeaderEcommerce value={data.value} />
      <OrderDetail orderId={params.id} />
    </>
  );
}
