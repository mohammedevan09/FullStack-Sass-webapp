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
    <div className="grid justify-center items-center gap-24 mt-44">
      <h1 className="w-[492px] text-center  text-[32px] font-semibold mx-auto">
        What type of service are you looking for?
      </h1>
      <div className="flex justify-center items-center 2xl:gap-20 gap-10">
        {services?.map((item, i) => (
          <div
            key={i}
            className="grid items-center justify-center py-5 px-10 bg-white rounded-[15px] gap-6"
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
