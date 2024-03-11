import Link from "next/link"
import MobileNav from "./MobileNavbar"
import { AuthButton, MobileAuthButton } from "./AuthButton"
import { navigation, authNavigation } from "@/navbarRoutes";

export function Navbar() {
  return (
    <header className="w-full mb-6">
      <header className="bg-[#e1e1e1] dark:bg-[#1e1e1e] fixed top-0 z-50 w-full flex items-center border-b border-b-gray-300 dark:border-b-neutral-700">
        <nav className="flex items-center justify-between p-1 lg:px-8 w-full mx-auto max-w-[130rem]" aria-label="Global">
          <div className="flex lg:flex-1">      
            <a href="/" className="text-2xl text-text hover:text-accent">
              <p>isaidthat.online</p>
            </a>
          </div>

          <div className="hidden lg:flex lg:gap-x-9 items-center justify-end">
            {navigation?.map((item) => (
              <a key={item.name} href={item.href} className="text-md font-semibold text-text hover:text-accent">
                {item.name}
              </a>
            ))}

            <div className="border border-accent py-2" />
            <AuthButton navigation={authNavigation} />
          </div>
        </nav>
        
        <MobileNav navigation={navigation}>
          <MobileAuthButton navigation={authNavigation} />
        </MobileNav>
      </header>
    </header>
  )
}
