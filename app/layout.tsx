import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { StructuredData } from '@/components/ui/structured-data'
import { getPersonSchema, getOrganizationSchema } from '@/lib/structured-data'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Tawona Rwatida | Full Stack Software Developer',
  description: 'Full Stack Developer specializing in scalable web and mobile applications. Expert in React, Next.js, Laravel, and Python. Built TM Pick n Pay platform serving 100k+ users.',
  keywords: ['Tawona Rwatida', 'Full Stack Developer', 'Software Engineer', 'React', 'Next.js', 'Laravel', 'Python', 'E-commerce', 'Zimbabwe', 'Web Development', 'Mobile Apps', 'Software Development', 'Web Developer', 'Backend Developer', 'Frontend Developer'],
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
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Tawona Rwatida | Full Stack Software Developer - Portfolio',
    description: 'Full Stack Software Developer specializing in scalable web and mobile applications. Expert in React, Next.js, Laravel, and Python. Key developer of TM Pick n Pay e-commerce platform serving 100k+ users.',
    type: 'website',
    url: 'https://tawonarwatida.co.zw',
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
    creator: '@tawonaqh',
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
    canonical: 'https://tawonarwatida.co.zw',
    types: {
      'application/rss+xml': 'https://tawonarwatida.co.zw/feed.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <StructuredData data={getPersonSchema()} />
        <StructuredData data={getOrganizationSchema()} />
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}