import { Metadata } from "next"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { fetchUser } from "@/actions/user"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Cennik | venturelist.pl',
  description: "Strona przedstawiające ceny usług na venturelist.pl.",
};

const includedFeatures = [
  'Weryfikacja firmy oraz potwierdzony profil',
  'Promocja na social mediach',
  'Początkowa pozycja',
];

export default async function Pricing() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const user = await fetchUser(supabase);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">Cennik</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Dla startupów
          </p>
        </div>
        <div className="bg-white dark:bg-neutral-800 mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-300 dark:ring-neutral-700 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-text">5 kredytów</h3>
            <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
              Możliowść publikacji 5 postów sprzedaży, a także pozycja premium na początku strony. Oferta sprzedaży może zostać usunięta lub edytowana w dowolnym momencie.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-md font-semibold leading-6 text-text">W pakiecie</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 leading-6 text-gray-600 dark:text-gray-300 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-5 flex-none text-indigo-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 dark:bg-neutral-900 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              {user ?
                <form action="/api/checkout" method="POST" className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">Payments processed with Stripe</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">199</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-300">zł</span>
                  </p>
                  <button
                    type="submit" role="link"
                    className="mt-10 block w-full rounded-md bg-primary px-3 py-2 
                  text-center text-lg font-semibold text-text shadow-sm hover:bg-primary_hover"
                  >
                    Zakup
                  </button>
                </form>
                :
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">Payments processed with Stripe</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">199</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-300">zł</span>
                  </p>
                  <Link
                    href="/login"
                    className="mt-10 block w-full rounded-md bg-primary px-3 py-2 
                      text-center text-lg font-semibold text-text shadow-sm hover:bg-primary_hover"
                  >
                    Create Account
                  </Link>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
