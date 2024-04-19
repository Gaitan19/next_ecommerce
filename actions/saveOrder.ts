import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const saveOrder = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const paymentMethod = formData.get('PaymentMethods') as string;
  const shippingAddress = formData.get('shipping_address') as string;

  const supabase = createClient();
  console.log('hola :>> ');

  // if (error) {
  // return redirect('/CartView?message=Could not authenticate user');
  // }
};
