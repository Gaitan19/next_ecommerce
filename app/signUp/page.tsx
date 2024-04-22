import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from '../login/submit-button';
import ecommerce_logo from '@/assets/images/ecommerce_logo.png';
import Image from 'next/image';

export default function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const address = formData.get('address') as string;
    const tel = formData.get('phone') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    const response = await supabase
      .from('user')
      .insert([{ email, password, address, tel }])
      .select()
      .single();

    return redirect('/login?message=Check email to continue sign in process');
  };

  return (
    <div>
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
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
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <label className="text-md" htmlFor="address">
            address
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="address"
            placeholder="address"
            required
          />
          <label className="text-md" htmlFor="phone">
            Phone
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="phone"
            placeholder="xxx-xxx-xx"
            type="tel"
            required
          />

          <SubmitButton
            formAction={signUp}
            className="w-full bg-gray-800 rounded-md px-4 py-2 text-white hover:bg-gray-700 transition duration-300"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          <Link
            href="/login"
            className="w-full block text-center border border-gray-300 rounded-md px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-300 no-underline"
          >
            Sign In
          </Link>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
