import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sistema de Certificados Digitales - UPC',
  description: 'Sistema de certificados digitales verificables para Embajadores UPC de la Universidad Peruana de Ciencias Aplicadas',
  keywords: ['UPC', 'Certificados Digitales', 'Embajadores UPC', 'Badges Digitales', 'Universidad Peruana de Ciencias Aplicadas'],
  authors: [{ name: 'Universidad Peruana de Ciencias Aplicadas' }],
  creator: 'Universidad Peruana de Ciencias Aplicadas',
  publisher: 'Universidad Peruana de Ciencias Aplicadas',
  metadataBase: new URL('https://certificados.upc.edu.pe'),
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://certificados.upc.edu.pe',
    siteName: 'UPC - Certificados Digitales',
    title: 'Sistema de Certificados Digitales - UPC',
    description: 'Certificados digitales verificables para Embajadores UPC',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
