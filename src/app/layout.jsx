import { CartProvider } from '@/contexts/CartContext'
import { WishlistProvider } from '@/contexts/WishlistContext'
import { ListsProvider } from '@/contexts/ListsContext'
import { AuthProvider } from '@/contexts/AuthContext'
import { CookieConsentProvider } from '@/contexts/CookieConsentContext'
import { ToastProvider } from '@/contexts/ToastContext'
import Navbar from '@/components/layout/Navbar'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import Footer from '@/components/layout/Footer'
import CookieBanner, { CookieWidget } from '@/components/ui/CookieBanner'
import ToastContainer from '@/components/ui/ToastContainer'

import './globals.css'

export const metadata = {
  title: {
    default: 'Mobiversite E-Commerce',
    template: '%s | Mobiversite E-Commerce',
  },
  description: 'Modern e-ticaret platformu - Mobiversite Frontend Test Projesi',
  keywords: ['e-commerce', 'online shopping', 'react', 'nextjs'],
  authors: [{ name: 'Zafer Gök' }],
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
}

export default function RootLayout({ children }) {
  return (
    <html lang='tr'>
      <body className='bg-white text-gray-900 antialiased m-0 p-0'>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <ListsProvider>
                  <CookieConsentProvider>
                    <div className='min-h-screen flex flex-col w-full'>
                      <Navbar />
                      <main className='flex-1 py-4 w-full px-0 md:px-4 md:pt-36'>{children}</main>
                      <Footer />
                      <MobileBottomNav />
                      <CookieBanner />
                      <CookieWidget />
                      <ToastContainer />
                    </div>
                  </CookieConsentProvider>
                </ListsProvider>
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
