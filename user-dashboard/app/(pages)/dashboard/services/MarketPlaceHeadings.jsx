import { BackButtonIcon } from '@/staticData/Icon'
import Link from 'next/link'

const MarketPlaceHeadings = () => {
  return (
    <>
      <Link
        href={'/dashboard/services'}
        className="flex justify-start items-center w-[200px] gap-1 sm:my-10 my-5 font-semibold text-xl -ml-1"
      >
        <BackButtonIcon /> See Other Plans
      </Link>
      <div className="grid items-center sm:mb-10 mb-5">
        <h5 className="text-blue-800 text-base font-semibold leading-normal">
          Pricing
        </h5>
        <h1 className="text-gray-900 sm:text-5xl text-[28px] font-semibold leading-[60px] sm:pt-2 sm:pb-6">
          Simple, transparent pricing
        </h1>
        <p className="text-gray-500 sm:text-xl text-lg font-normal leading-[30px]">
          We believe Untitled should be accessible to all companies, no matter
          the size.
        </p>
      </div>
    </>
  )
}

export default MarketPlaceHeadings
