import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { EpicCursor } from '@/components/ui/epic-cursor'
import { SmoothScroll, MagneticElements, ParallaxElements, PageLoader } from '@/components/ui/page-transitions'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Modern Developer Portfolio',
  description: 'A modern, animated developer portfolio showcasing skills, projects, and experience',
  keywords: ['developer', 'portfolio', 'react', 'nextjs', 'typescript', 'web development'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Modern Developer Portfolio',
    description: 'A modern, animated developer portfolio showcasing skills, projects, and experience',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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