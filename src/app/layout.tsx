import { GeistSans } from 'geist/font/sans'
import "@/styles/globals.css"
import { Navbar } from '@/components/navbar/Navbar'
import { Footer } from '@/components/Footer'

const defaultUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'You said that | isaidthat.online',
  description: ``,
  keywords: '',
  author: 'isaidthat',
  robots: 'index, follow',
  image: "/favicon.ico",
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <div id='content' className="min-h-screen flex flex-col items-center">
          <Navbar />

          {children}

          <Footer />
        </div>
      </body>
    </html>
  )
}
