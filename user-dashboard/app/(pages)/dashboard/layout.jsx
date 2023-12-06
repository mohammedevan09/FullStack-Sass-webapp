import Menu from '@/components/Menu'
import Header from '@/components/Header'

const layout = ({ children }) => {
  return (
    <div className="w-[1440px] relative mx-auto">
      <div className="flex justify-center items-start gap-24">
        <div className="w-[260px] text-center h-screen">
          <Menu />
        </div>
        <div className="grid w-full">
          <Header />
          {children}{' '}
        </div>
      </div>
    </div>
  )
}

export default layout
