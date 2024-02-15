import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthProvider from './_components/providers/NextAuthProvider'

import "@tldraw/tldraw/tldraw.css"
import { Toaster } from '@/components/ui/sonner'
import ReactQueryClientProvider from './_components/providers/ReactQueryClientProvider'
import Header from './_components/providers/Header'
import { getServerSession } from 'next-auth'
import { AuthOptions } from './api/auth/[...nextauth]/AuthOptions'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(AuthOptions)

  return (
    <html lang="en">
      <NextAuthProvider>
        <ReactQueryClientProvider>
          <body className={inter.className}>
            <Header user={session?.user!} />
            <Toaster richColors className='!z-[33333]' />
            {children}
          </body>
        </ReactQueryClientProvider>
      </NextAuthProvider>
    </html>
  )
}
