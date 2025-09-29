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
import { WebsiteStructuredData, OrganizationStructuredData } from '@/components/seo/StructuredData'

import './globals.css'

export const metadata = {
  title: {
    default: "Mobiversite Store - Türkiye'nin En İyi Online Alışveriş Deneyimi",
    template: '%s | Mobiversite Store - Premium E-Ticaret',
  },
  description:
    "Mobiversite Store'da elektronik, moda, takı ve daha fazlası! Hızlı teslimat, güvenli ödeme, ücretsiz kargo fırsatları. Türkiye'nin yeni nesil e-ticaret platformunda binlerce ürün sizi bekliyor.",
  keywords: [
    'online alışveriş',
    'e-ticaret',
    'elektronik',
    'moda',
    'takı',
    'hızlı teslimat',
    'güvenli ödeme',
    'ücretsiz kargo',
    'mobiversite',
    'online mağaza',
    'dijital alışveriş',
    'türkiye e-ticaret',
    'indirimli ürünler',
    'kampanyalı ürünler',
  ],
  authors: [{ name: 'Mobiversite Store' }],
  publisher: 'Mobiversite E-Ticaret Ltd.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.mobiversite.store',
    siteName: 'Mobiversite Store',
    title: "Mobiversite Store - Türkiye'nin En İyi Online Alışveriş Deneyimi",
    description:
      "Elektronik, moda, takı ve binlerce ürün! Hızlı teslimat, güvenli ödeme ile Türkiye'nin yeni nesil e-ticaret platformu.",
  },
  alternates: {
    canonical: 'https://www.mobiversite.store',
  },
  category: 'e-commerce',
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
      <head>
        <WebsiteStructuredData />
        <OrganizationStructuredData />
      </head>
      <body className='bg-white text-gray-900 antialiased m-0 p-0'>
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <ListsProvider>
                  <CookieConsentProvider>
                    <div className='min-h-screen flex flex-col w-full'>
                      <Navbar />
                      <main className='flex-1 py-4 w-full px-2 sm:px-4 md:pt-36'>{children}</main>
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
