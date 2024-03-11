import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full p-3 mt-24 mb-24 flex justify-center text-xs gap-6">
      <div className="bg-[#e1e1e1] dark:bg-[#1e1e1e] p-2 lg:px-8 w-full mx-auto max-w-[120rem] rounded-lg">
        <div className="grid grid-cols-1 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">venturelist</h2>
            <ul className="text-gray-600 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link href="/about" className="hover:underline dark:text-gray-400">O Nas</Link>
              </li>
              <li className="mb-4">
                <Link href="/about/contact" className="hover:underline dark:text-gray-400">Kontakt</Link>
              </li>
              <li className="mb-4">
                <Link href="/about/privacy" className="hover:underline dark:text-gray-400">Polityka Prywatności</Link>
              </li>
              <li className="mb-4">
                <Link href="/about/tos" className="hover:underline dark:text-gray-400">Warunki Usługi</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Biznesy</h2>
            <ul className="text-gray-600 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <Link href="/startups" className="hover:underline dark:text-gray-400">Lista Biznesów</Link>
              </li>
              <li className="mb-4">
                <Link href="/startups/search" className="hover:underline dark:text-gray-400">Szukaj Biznesu</Link>
              </li>
              <li className="mb-4">
                <Link href="/startups/management/publish" className="hover:underline dark:text-gray-400">Dodaj swój Biznes</Link>
              </li>
              <li className="mb-4">
                <Link href="/pricing" className="hover:underline dark:text-gray-400">Cennik</Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="border-t border-gray-300 dark:border-gray-500 m-3" />
        <p className="text-gray-600 dark:text-gray-400 m-3">&copy; 2024 venturelist.pl | Wszelkie prawa zastrzeżone | Platforma sprzedaży firm</p>
      </div>
    </footer>
  )
}