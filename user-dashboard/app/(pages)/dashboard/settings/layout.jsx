'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const layout = ({ children }) => {
  const pathname = usePathname()

  const allSettings = [
    {
      title: 'Profile',
      link: '/dashboard/settings',
      comp: '',
    },
    {
      title: 'Team',
      link: '/dashboard/settings/team',
      comp: '',
    },
    {
      title: 'Billing',
      link: '/dashboard/settings/billing',
      comp: '',
    },
    {
      title: 'Notifications',
      link: '/dashboard/settings/notifications',
      comp: '',
    },
  ]

  return (
    <div className="grid w-full">
      <div className="text-gray-800 text-2xl font-bold mt-20 mb-8 ml-[92px]">
        Settings
      </div>
      <div className="w-[1180px] h-[0px] border border-stone-300"></div>
      <div className="flex justify-center items-center w-[500px] ml-20 my-3 gap-16 text-black text-xl">
        {allSettings?.map((item, i) => (
          <div
            key={i}
            className={`${item?.link === pathname && 'font-semibold'}`}
          >
            <Link href={item?.link}>{item?.title}</Link>
          </div>
        ))}
      </div>
      <div className="w-[1180px] h-[0px] border border-stone-300"></div>
      {children}
    </div>
  )
}

export default layout
