import { Inter } from 'next/font/google'
import '../globals.css'
import ReduxProvider from '@/store/ReduxProvider'
import { Toaster } from 'react-hot-toast'
import AuthValidateProvider from '@/components/others/AuthValidateProvider'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Login | WP Sprint',
  description: 'Login as a admin to access the admin dashboard',
}

export default function RootLayout({ children }) {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('adminRefreshToken')
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ReduxProvider>
          <AuthValidateProvider refreshToken={refreshToken}>
            <div className="grid h-screen w-screen justify-center items-center overflow-x-hidden">
              {children}
            </div>
          </AuthValidateProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
