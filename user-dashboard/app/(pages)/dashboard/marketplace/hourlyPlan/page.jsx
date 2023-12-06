import MainHourlyPlan from './MainHourlyPlan'

const page = () => {
  return (
    <div className="grid items-center justify-center">
      <div className="grid items-center my-20">
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
