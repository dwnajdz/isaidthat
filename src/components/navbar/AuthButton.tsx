import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchUserNumOffers } from '@/actions/payment_managment'

const getUser = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

const signOut = async () => {
  'use server'

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  return redirect('/login');
}

async function AuthButton({
  navigation,
}: {
  navigation?: Array<{
    "name": string,
    "href": string
  }>
}) {
  const user = await getUser();

  return user ? (
    <div className="flex items-center gap-4">
      {navigation?.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className='font-semibold px-1 text-text hover:text-accent'>
          {item.name}
        </Link>
      ))}
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline border border-primary hover:bg-primary_hover hover:underline text-text">
          Wyloguj
        </button>
      </form>
      {user &&
        <p className='font-semibold text-text hover:text-accent'>
          Reputation:{' '}
   
        </p>
      }
    </div>
  ) : (
    <Link
      id="signin"
      href="/login"
      className="py-1 px-5 flex rounded-md no-underline border border-primary hover:bg-primary_hover hover:underline text-text"
    >
      Login
    </Link>
  )
}

async function MobileAuthButton({
  navigation,
}: {
  navigation?: Array<{
    "name": string,
    "href": string
  }>
}) {
  const user = await getUser();

  return user ? (
    <div className="space-y-2">
      {navigation?.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className='-mx-3 bg-secondary hover:bg-text block rounded-lg px-3 py-3 text-xl leading-7 text-gray-900  
          hover:text-accent dark:text-gray-300'>
          {item.name}
        </Link>
      ))}
      <form action={signOut} className="-mx-3 bg-secondary hover:bg-text block rounded-lg px-3 text-xl leading-7 text-gray-900  
        hover:text-accent dark:text-gray-300">
        <button className='w-full py-3 text-left'>
          Wyloguj
        </button>
      </form>
      {user &&
        <p className='font-semibold text-xl text-text hover:text-accent'>
          Reputation:{' '}
        </p>
      }
    </div>
  ) : (
    <Link
      id="signin"
      href="/login"
      className="-mx-3 bg-secondary hover:bg-text block rounded-lg px-3 py-3 text-xl leading-7 text-gray-900  
      hover:text-accent dark:text-gray-300"
    >
      Login
    </Link>
  )
}

export {
  AuthButton,
  MobileAuthButton
}