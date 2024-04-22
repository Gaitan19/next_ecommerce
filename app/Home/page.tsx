import HeaderEcommerce from '@/components/HeaderEcommerce';
import Products from '@/components/Products';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function homePage() {
  const cookieStore = cookies();

  const data = cookieStore.get('sb-fcybhjbilfsdcxkomjfk-auth-token');

  if (!data) return redirect('/login');

  return (
    <>
      <HeaderEcommerce value={data.value} />
      <Products data={data.value}/>
    </>
  );
}
