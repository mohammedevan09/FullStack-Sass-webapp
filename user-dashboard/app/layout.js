import { Roboto } from 'next/font/google'
import './globals.css'
import ReduxProvider from '@/store/ReduxProvider'
import { Toaster } from 'react-hot-toast'
import GoogleOAuthProviderLayout from '@/store/GoogleOAuthProviderLayout'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Wp Sprint LLC',
  description:
    'Helping marketing agencies to focus on growth with White-label web development & maintenance solutions🚀',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Toaster />
        <ReduxProvider>
          <GoogleOAuthProviderLayout>{children}</GoogleOAuthProviderLayout>
        </ReduxProvider>
      </body>
    </html>
  )
}
