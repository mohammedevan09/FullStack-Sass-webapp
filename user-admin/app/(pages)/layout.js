import { Roboto } from 'next/font/google'
import '../globals.css'
import Menu from '@/components/others/Menu'
import ReduxProvider from '@/store/ReduxProvider'
import Header from '@/components/others/Header'
import { Toaster } from 'react-hot-toast'
import { cookies } from 'next/headers'
import AuthValidateProvider from '@/components/others/AuthValidateProvider'

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refreshToken')
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Toaster />
        <ReduxProvider>
          <AuthValidateProvider refreshToken={refreshToken}>
            <div className="relative mx-auto">
              <div className="flex justify-center items-start gap-24">
                <Menu />
                <div className="grid w-full justify-center overflow-x-hidden">
                  <Header />
                  <div className="mt-24 2xl:w-[1200px] lg:w-[1000px] w-screen sm:px-4 xs:px-3 px-1">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </AuthValidateProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
