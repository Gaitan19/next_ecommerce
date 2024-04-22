import Link from 'next/link';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submit-button';
import ecommerce_logo from '@/assets/images/ecommerce_logo.png';
import Image from 'next/image';

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
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

  return (
    <div>
      <div className="flex-1 flex flex-col w-full px-4 sm:max-w-md justify-center gap-4 pt-12 pb-4">
        <form className="flex-1 flex flex-col w-full justify-center items-center gap-4 text-gray-800 bg-white  px-4">
          <Image
            width={280}
            height={280}
            src={ecommerce_logo}
            alt="ecommerce logo"
          />
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:border-green-500"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-gray-100 border border-gray-300 focus:outline-none focus:border-green-500"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="w-full bg-gray-800 rounded-md px-4 py-2 text-white hover:bg-gray-700 transition duration-300"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <Link
            href="/signUp"
            className="w-full block text-center border border-gray-300 rounded-md px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300 no-underline"
          >
            Sign Up
          </Link>
          {searchParams?.message && (
            <p className="p-4 bg-gray-100 text-gray-800 text-center rounded-md">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
