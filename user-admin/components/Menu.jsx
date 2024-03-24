'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  HomeIcon,
  AllProjectsIcon,
  AllTicketsIcon,
  InvoiceIcon,
  MarketPlaceIcon,
  MeetingIcon,
  ProposalsIcon,
  CloseMenuIcon,
  SettingsIcon,
  TeamsIcon,
  FormsIcon,
} from '../staticData/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveMenu, setOpenMenu } from '@/store/reducers/activeReducer'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const Menu = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const { currentActiveMenu, openMenu } = useSelector((state) => state?.active)

  const MenuData = [
    {
      name: 'Dashboard',
      icon: <HomeIcon color="#ffffff" />,
      link: '/',
    },
    {
      name: 'Services',
      icon: <MarketPlaceIcon color="#ffffff" />,
      link: '/services',
    },
    {
      name: 'Orders',
      icon: <AllProjectsIcon color="#ffffff" />,
      link: '/orders',
    },
    {
      name: 'Clients',
      icon: <ProposalsIcon color="#ffffff" />,
      link: '/clients',
    },
    {
      name: 'Team',
      icon: <TeamsIcon color="#ffffff" />,
      link: '/team',
    },
    {
      name: 'Tickets',
      icon: <AllTicketsIcon color="#ffffff" />,
      link: '/tickets',
    },
    {
      name: 'Quotation',
      icon: <ProposalsIcon color="#ffffff" />,
      link: '/quotation',
    },
    {
      name: 'Invoice',
      icon: <InvoiceIcon color="#ffffff" />,
      link: '/invoice',
    },
    {
      name: 'Forms',
      icon: <FormsIcon color="#ffffff" />,
      link: '/forms',
    },
    {
      name: 'Meetings',
      icon: <MeetingIcon color="#ffffff" />,
      link: '/meetings',
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
      className={`lg:w-[260px] w-[230px] text-center h-screen xl:static absolute z-[99999] left-0 transition-all duration-500 ease-linear ${
        openMenu ? 'left-0' : 'left-[-120%]'
      }`}
    >
      <div
        className={`fixed bg-blue-800 rounded-tr-[20px] rounded-br-[20px] pb-5`}
      >
        <div className="md:w-[131px] sm:w-[110px] w-[100px] lg:py-5 py-3 mx-auto divide-slate-700 flex justify-center items-center">
          <Image
            src={'/images/logo.png'}
            width={300}
            height={300}
            alt="logo"
            className="h-auto cursor-pointer"
            onClick={() => router.push('')}
          />
          <div
            className="absolute lg:right-2 md:right-[-4px] right-[-8px] rounded-full p-1 xl:hidden block cursor-pointer"
            onClick={() => dispatch(setOpenMenu(false))}
          >
            <CloseMenuIcon size={isSmallScreen ? '19' : '22'} />
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300" />
        <div className="grid justify-between gap-14 items-start h-screen overflow-y-scroll">
          <div className="lg:px-[51px] md:px-[20px] px-[10px] grid justify-center items-start sm:gap-8 gap-6 mt-5">
            {MenuData?.map((item, i) => (
              <div key={i}>
                <motion.div whileHover={{ scale: 1.1 }}>
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
                      className={`md:text-xl text-[16px] text-white  ${
                        currentActiveMenu === i
                          ? 'font-semibold'
                          : 'font-normal'
                      }`}
                    >
                      {item?.name}
                    </div>
                  </Link>
                </motion.div>
                {currentActiveMenu === i && (
                  <>
                    {item?.subItem?.map((childItem, index) => (
                      <div key={index} className="mt-3 ml-9 -mb-3">
                        <Link
                          href={childItem?.link}
                          className="flex justify-start items-center gap-4"
                        >
                          <div
                            className={`md:text-[16px] text-[14px] text-gray-300 font-semibold`}
                          >
                            - {childItem?.name}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mb-44 mt-8">
            <motion.div whileHover={{ scale: 1.2 }}>
              <Link
                href={'/dashboard/settings'}
                className="mb-4 flex justify-center items-center gap-1 cursor-pointer"
                onClick={() => dispatch(setActiveMenu(12))}
              >
                <div
                  className={`flex-col justify-center items-center inline-flex hover:menu-color ${
                    currentActiveMenu === 12 && 'menu-color'
                  }`}
                >
                  <SettingsIcon color={'#ffffff'} />
                </div>
                <div
                  className={`md:text-xl text-lg text-white ${
                    currentActiveMenu === 12 ? 'font-semibold' : 'font-normal'
                  }`}
                >
                  Settings
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
