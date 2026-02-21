import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import { EpicCursor } from '@/components/ui/epic-cursor'
import { SmoothScroll, MagneticElements, ParallaxElements, PageLoader } from '@/components/ui/page-transitions'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Tawona Rwatida | Full Stack Software Developer',
  description: 'Full Stack Software Developer specializing in scalable web and mobile applications. Expert in React, Next.js, Laravel, and Python. Key developer of TM Pick n Pay e-commerce platform serving 100k+ users.',
  keywords: ['Tawona Rwatida', 'Full Stack Developer', 'Software Engineer', 'React', 'Next.js', 'Laravel', 'Python', 'E-commerce', 'Zimbabwe', 'Web Development', 'Mobile Apps'],
  authors: [{ name: 'Tawona Rwatida' }],
  creator: 'Tawona Rwatida',
  publisher: 'Tawona Rwatida',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Tawona Rwatida | Full Stack Software Developer',
    description: 'Full Stack Software Developer specializing in scalable web and mobile applications. Expert in React, Next.js, Laravel, and Python. Key developer of TM Pick n Pay e-commerce platform serving 100k+ users.',
    type: 'website',
    url: 'https://tawona-swe.github.io',
    siteName: 'Tawona Rwatida Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/images/avatar.png',
        width: 1200,
        height: 630,
        alt: 'Tawona Rwatida - Full Stack Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tawona Rwatida | Full Stack Software Developer',
    description: 'Full Stack Software Developer specializing in scalable web and mobile applications. Expert in React, Next.js, Laravel, and Python.',
    images: ['/images/avatar.png'],
  },
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
  alternates: {
    canonical: 'https://tawona-swe.github.io',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk.className}>
        <PageLoader />
        <EpicCursor />
        <SmoothScroll />
        <MagneticElements />
        <ParallaxElements />
        {children}
      </body>
    </html>
  )
}