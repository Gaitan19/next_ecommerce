import HeaderEcommerce from '@/components/HeaderEcommerce';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function cartPage() {
  const cookieStore = cookies();

  const data = cookieStore.get('sb-fcybhjbilfsdcxkomjfk-auth-token');

  if (!data) return redirect('/login');

  return (
    <>
      <HeaderEcommerce value={data.value} />
      <div>cart view</div>
    </>
  );
}
