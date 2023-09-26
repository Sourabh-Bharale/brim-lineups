import { ThemeProvider } from '@/Providers/ThemeProvider'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import TanstackQuery from '@/Providers/TanstackQuery'

export const metadata = {
  title: 'Brimstone Lineups',
  description: 'A guide and Helper for Your Brimstone Lineups',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <TanstackQuery>
    <html lang="en" suppressHydrationWarning>
        <head />
        <body className='mx-4 my-2'>

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

            {children}
            <Toaster/>
          </ThemeProvider>
        </body>
      </html>
      </TanstackQuery>
  )
}
