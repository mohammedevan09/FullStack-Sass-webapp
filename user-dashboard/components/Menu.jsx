'use client'

import { LogoutIcon, SettingsIcon } from '@/staticData/Icon'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

import {
  AllProjectsIcon,
  AllTicketsIcon,
  HomeIcon,
  HourlyPlanIcon,
  InvoiceIcon,
  MarketPlaceIcon,
  MeetingIcon,
  ProposalsIcon,
  SubscriptionIcon,
} from '../staticData/Icon'

const Menu = () => {
  const [active, setActive] = useState(null)

  const pathname = usePathname()
  const router = useRouter()

  const MenuData = [
    {
      name: 'Dashboard',
      icon: <HomeIcon color="#6C7893" />,
      link: '/dashboard',
    },
    {
      name: 'Marketplace',
      icon: <MarketPlaceIcon color="#6C7893" />,
      link: '/dashboard/marketplace',
    },
    {
      name: 'All Projects',
      icon: <AllProjectsIcon color="#6C7893" />,
      link: '/dashboard/all-projects',
    },
    {
      name: 'Hourly Plan',
      icon: <HourlyPlanIcon color="#6C7893" />,
      link: '/dashboard/hourly-plan',
    },
    {
      name: 'Subscription',
      icon: <SubscriptionIcon color="#6C7893" />,
      link: '/dashboard/subscription',
    },
    {
      name: 'All Tickets',
      icon: <AllTicketsIcon color="#6C7893" />,
      link: '/dashboard/all-tickets',
    },
    {
      name: 'Proposals',
      icon: <ProposalsIcon color="#6C7893" />,
      link: '/dashboard/proposals',
    },
    {
      name: 'Invoice',
      icon: <InvoiceIcon color="#6C7893" />,
      link: '/dashboard/invoice',
    },
    {
      name: 'Meetings',
      icon: <MeetingIcon color="#6C7893" />,
      link: '/dashboard/meetings',
    },
  ]

  return (
    <div className="fixed bg-white rounded-tr-[20px] rounded-br-[20px] pb-5">
      <div className="w-[151px] py-5 mx-auto divide-slate-700">
        <Image
          src={'/images/logo.png'}
          width={300}
          height={300}
          alt="logo"
          className="h-[33px]"
        />
      </div>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300" />
      <div className="grid justify-between gap-14 items-start">
        <div className="mx-[51px] grid justify-center items-start gap-10 mt-5">
          {MenuData?.map((item, i) => (
            <Link
              href={item?.link}
              key={i}
              className="flex justify-start items-center gap-3"
              onClick={() => setActive(i)}
            >
              <div
                className={`flex-col justify-center items-center inline-flex ${
                  active === i
                    ? active === 7
                      ? 'menu-color-stroke'
                      : 'menu-color'
                    : ''
                }
`}
              >
                {item?.icon}
              </div>
              <div
                className={`text-xl ${
                  active === i
                    ? 'text-blue-800 font-medium'
                    : 'text-slate-500 font-normal'
                }`}
              >
                {item?.name}
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link
            href={'/dashboard/settings'}
            className="mb-4 flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => setActive(9)}
          >
            <div
              className={`flex-col justify-center items-center inline-flex ${
                active === 9 && 'menu-color'
              }`}
            >
              <SettingsIcon />
            </div>
            <div
              className={`text-xl ${
                active === 9
                  ? 'text-blue-800 font-medium'
                  : 'text-slate-500 font-normal'
              }`}
            >
              Settings
            </div>
          </Link>
          <button className="py-2 px-5 bg-blue-800 rounded-lg text-white text-base font-normal flex justify-center items-center mx-auto gap-3">
            <LogoutIcon /> <div>Logout</div>
          </button>
        </div>
      </div>{' '}
    </div>
  )
}

export default Menu
