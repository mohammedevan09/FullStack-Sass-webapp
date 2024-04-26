import { Roboto } from 'next/font/google'
import './globals.css'
import ReduxProvider from '@/store/ReduxProvider'
import { Toaster } from 'react-hot-toast'
import GoogleOAuthProviderLayout from '@/store/GoogleOAuthProviderLayout'
import { cookies } from 'next/headers'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Wp Sprint LLC',
  description:
    'Helping marketing agencies to focus on growth with White-label web development & maintenance solutions🚀',
}

export default async function RootLayout({ children }) {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refreshToken')

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Toaster />
        <ReduxProvider>
          <GoogleOAuthProviderLayout refreshToken={refreshToken}>
            {children}
          </GoogleOAuthProviderLayout>
        </ReduxProvider>
      </body>
    </html>
  )
}
