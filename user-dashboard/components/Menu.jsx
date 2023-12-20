'use client'

import {
  CloseMenuIcon,
  FeedbackIcon,
  HowToGuideIcon,
  LogoutIcon,
  SettingsIcon,
} from '@/staticData/Icon'
import Image from 'next/image'
import Link from 'next/link'

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
import { useDispatch, useSelector } from 'react-redux'
import { setActiveMenu, setOpenMenu } from '@/store/reducers/activeReducer'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Menu = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const dispatch = useDispatch()

  const { currentActiveMenu, openMenu } = useSelector((state) => state?.active)

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
    {
      name: 'How To Guide',
      icon: <HowToGuideIcon color="#6C7893" />,
      link: '/dashboard/how-to-guide',
    },
    {
      name: 'Feedback',
      icon: <FeedbackIcon color="#6C7893" />,
      link: '/dashboard/feedback',
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsSmallScreen(true)
      } else {
        setIsSmallScreen(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={`lg:w-[260px] w-[230px] text-center h-screen xl:static absolute z-20 left-0 transition-all duration-500 ease-linear ${
        openMenu ? 'left-0' : 'left-[-120%]'
      }`}
    >
      <div
        className={`fixed bg-white rounded-tr-[20px] rounded-br-[20px] pb-5`}
      >
        <div className="md:w-[151px] w-[120px] lg:py-5 py-3 mx-auto divide-slate-700 flex">
          <Image
            src={'/images/logo.png'}
            width={300}
            height={300}
            alt="logo"
            className="md:h-[33px] h-[29px]"
          />
          <div
            className="absolute lg:right-2 md:right-[-4px] right-[-8px] rounded-full p-1 xl:hidden block cursor-pointer"
            onClick={() => dispatch(setOpenMenu(false))}
          >
            <CloseMenuIcon size={isSmallScreen ? '20' : '24'} />
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300" />
        <div className="grid justify-between gap-14 items-start h-screen overflow-y-scroll">
          <div className="lg:mx-[51px] md:mx-[20px] mx-[10px] grid justify-center items-start gap-8 mt-5">
            {MenuData?.map((item, i) => (
              <motion.div whileHover={{ scale: 1.1 }} key={i}>
                <Link
                  href={item?.link}
                  className="flex justify-start items-center gap-4"
                  onClick={() => dispatch(setActiveMenu(i))}
                >
                  <div
                    className={`flex-col justify-center items-center flex ${
                      currentActiveMenu === i
                        ? currentActiveMenu === 7
                          ? 'menu-color-stroke'
                          : 'menu-color'
                        : ''
                    }
`}
                  >
                    {item?.icon}
                  </div>
                  <div
                    className={`md:text-xl text-[16px] ${
                      currentActiveMenu === i
                        ? 'text-blue-800 font-medium'
                        : 'text-slate-500 font-normal'
                    }`}
                  >
                    {item?.name}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mb-36">
            <motion.div whileHover={{ scale: 1 }}>
              <Link
                href={'/dashboard/settings'}
                className="mb-4 flex justify-center items-center gap-1 cursor-pointer"
                onClick={() => dispatch(setActiveMenu(11))}
              >
                <div
                  className={`flex-col justify-center items-center inline-flex hover:menu-color ${
                    currentActiveMenu === 11 && 'menu-color'
                  }`}
                >
                  <SettingsIcon />
                </div>
                <div
                  className={`text-xl ${
                    currentActiveMenu === 11
                      ? 'text-blue-800 font-medium'
                      : 'text-slate-500 font-normal'
                  }`}
                >
                  Settings
                </div>
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="py-2 px-5 bg-blue-800 rounded-lg text-white text-base font-normal flex justify-center items-center mx-auto gap-3"
            >
              <LogoutIcon /> <div>Logout</div>
            </motion.button>
          </div>
        </div>{' '}
      </div>
    </div>
  )
}

export default Menu
