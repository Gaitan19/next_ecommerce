import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const saveOrder = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const paymentMethod = formData.get('PaymentMethods') as string;
  const shippingAddress = formData.get('shipping_address') as string;

  const supabase = createClient();
  const cookieStore = cookies();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  const response = await supabase
    .from('user')
    .select()
    .eq('email', email)
    .single();

  if (!response.error) {
    cookieStore.set('dataUser', JSON.stringify(response.data));
  }

  return redirect('/Home');
};
