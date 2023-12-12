import Menu from '@/components/Menu'
import Header from '@/components/Header'

const layout = ({ children }) => {
  return (
    <>
      <div className="bg-blue-800 w-full text-center text-white text-xl font-semibold leading-tight py-5 sticky top-0 z-[9999999]">
        10% flat discount for any project. From 25 September to October 25!
        COUPON : #CRAZY10
      </div>
      <div className="relative mx-auto">
        <div className="flex justify-center items-start gap-24">
          <div className="w-[260px] text-center h-screen">
            <Menu />
          </div>
          <div className="grid w-full justify-center">
            <Header />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default layout
