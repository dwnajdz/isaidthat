'use client'
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

function ThreeBarsSvg() {
  return (
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
    </svg>
  )
}

function CloseMarkSvg() {
  return (
    <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default function MobileNav({
  navigation,
  children
}: {
  navigation?: Array<{
    "name": string,
    "href": string
  }>
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // cloase nav when changing page
  const pathname = usePathname()
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <nav id='mobileNav' className='flex lg:hidden'>
      <div>
        <button
          id="mobileOpen"
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <ThreeBarsSvg />
        </button>
      </div>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-text tracking-wide">
              <p>jobs in.cloud</p>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <CloseMarkSvg />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation?.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 bg-secondary hover:bg-text block rounded-lg px-3 py-3 text-xl leading-7 text-gray-900  
                    hover:text-accent dark:text-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {children}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </nav>
  )
}
