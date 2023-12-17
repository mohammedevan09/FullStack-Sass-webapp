import {
  DesignAndDevelopmentIcon,
  HourlyDevPlansIcon,
  WebsiteMaintenanceIcon,
} from '@/staticData/Icon'
import Link from 'next/link'

const page = () => {
  const services = [
    {
      title: 'Design & Development',
      icon: <DesignAndDevelopmentIcon />,
      links: '/dashboard/marketplace/designAndDevelopmentPackages',
    },
    {
      title: 'Website Maintenance',
      icon: <WebsiteMaintenanceIcon />,
      links: '/dashboard/marketplace/maintenancePlans',
    },
    {
      title: 'Hourly Developer plans',
      icon: <HourlyDevPlansIcon />,
      links: '/dashboard/marketplace/hourlyPlan',
    },
  ]
  return (
    <div className="grid justify-center items-center lg:gap-24 sm:gap-12 gap-8 lg:mt-44 sm:mt-20 mt-8">
      <h1 className="sm:w-[492px] w-full text-center sm:text-[32px] text-[26px] font-semibold mx-auto">
        What type of service are you looking for?
      </h1>
      <div className="md:flex grid md:justify-center items-center 2xl:gap-20 lg:gap-10 md:gap-5 gap-7">
        {services?.map((item, i) => (
          <div
            key={i}
            className="grid items-center justify-center py-5 lg:px-10 px-5 bg-white rounded-[15px] gap-6"
          >
            <div className="grid justify-center gap-1">
              <div className="mx-auto">{item?.icon}</div>
              <h3 className="text-xl font-semibold text-center">
                {item?.title}
              </h3>
            </div>
            <Link
              href={item?.links}
              className="w-[189px] h-[43px] bg-blue-800 rounded-[5px] text-white text-base font-semibold text-center flex items-center justify-center mx-auto"
            >
              Browse packages
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
