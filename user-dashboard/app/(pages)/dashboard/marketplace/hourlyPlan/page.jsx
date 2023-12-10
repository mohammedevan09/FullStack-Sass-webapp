import Link from 'next/link'
import MainHourlyPlan from './MainHourlyPlan'
import { BackButtonIcon } from '@/staticData/Icon'

const page = () => {
  return (
    <div className="grid items-center justify-center">
      <div className="grid items-center mb-10">
        <Link
          href={'/dashboard/marketplace'}
          className="flex justify-start items-center w-[200px] gap-1 my-10 font-semibold text-xl -ml-1"
        >
          <BackButtonIcon /> See Other Plans
        </Link>
        <h5 className="text-blue-800 text-base font-semibold leading-normal">
          Pricing
        </h5>
        <h1 className="text-gray-900 text-5xl font-semibold leading-[60px] pt-2 pb-6">
          Simple, transparent pricing
        </h1>
        <p className="text-gray-500 text-xl font-normal leading-[30px]">
          We believe Untitled should be accessible to all companies, no matter
          the size.
        </p>
      </div>
      <MainHourlyPlan />
    </div>
  )
}

export default page
