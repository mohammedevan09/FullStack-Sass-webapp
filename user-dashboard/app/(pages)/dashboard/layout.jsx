import Menu from '@/components/Menu'
import Header from '@/components/Header'

const layout = ({ children }) => {
  return (
    <>
      <div className="bg-blue-800 w-full text-center text-white lg:text-xl sm:text-sm text-xs font-semibold leading-tight lg:py-5 sm:py-3 py-2 sticky top-0 z-[9999999]">
        10% flat discount for any project. From 25 September to October 25!
        COUPON : #CRAZY10
      </div>
      <div className="relative mx-auto">
        <div className="flex justify-center items-start gap-24">
          <Menu />
          <div className="grid w-full justify-center overflow-x-hidden">
            <Header />
            <div className="mt-24 2xl:w-[1200px] lg:w-[1000px] w-screen">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default layout
