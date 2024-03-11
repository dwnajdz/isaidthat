import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }
    return redirect('/startups/management');
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
      },
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }
    return redirect('/login?message=Check email to continue sign in process');
  }

  const signInWithGoogle = async () => {
    'use server'

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
      }
    });

    if (error) console.log(error);
    return redirect(data.url ?? "/login?message=Operation failed");
  }

  const signInWithLinkedin = async () => {
    'use server'

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`
      }
    });

    if (error) console.log(error);
    return redirect(data.url ?? "/login?message=Operation failed");
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute text-text text-xl left-8 top-8 py-24 px-4 rounded-md no-underline hover:underline 
        text-text bg-btn-background hover:bg-btn-background-hover flex items-center group invisible md:visible"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Back
      </Link>

      <form
        className="animate-in flex flex-col w-full justify-center gap-2 text-foreground "
        action={signIn}
      >
        {searchParams?.message && (
          <p className="mb-8 p-4 bg-blue-400 text-foreground rounded-lg text-center">
            {searchParams.message}
          </p>
        )}
        <label className="text-md text-text" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md text-text" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="bg-primary hover:bg-primary_hover rounded-md px-4 py-2 text-text mb-2" id='signin'>
          Sign In
        </button>
        <button id='signup'
          formAction={signUp}
          className="border border-gray-300 dark:border-neutral-700 hover:bg-secondary rounded-md px-4 py-2 text-text mb-2"
        >
          Sign Up
        </button>

        <div className='border border-gray-500 border border-t-0 m-3' />
      </form>

      <form action={signInWithGoogle}>
        <button id='google_provider'
          type='submit'
          className='flex flex-inline items-center mx-auto gap-3 
                    bg-white border border-gray-300 dark:border-neutral-700 hover:bg-gray-300 
                    px-4 py-2 rounded-md w-full'
        >
          <img src='https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA'
            className='w-5 h-5'
            width={6}
            height={6}
            alt='google logo'
          />
          <p className='mx-auto'>Continue with Google</p>
        </button>
      </form>

      <form action={signInWithLinkedin}>
        <button id='linkedin_provider'
          type='submit'
          className='flex flex-inline items-center mx-auto gap-3 
                    bg-white border border-gray-300 dark:border-neutral-700 hover:bg-gray-300 
                    px-4 py-2 rounded-md w-full'
        >
          <img src='https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg'
            className='w-5 h-5'
            width={6}
            height={6}
            alt='linkedin logo'
          />
          <p className='mx-auto'>Continue with Linkedin</p>
        </button>
      </form>
    </div>
  )
}
