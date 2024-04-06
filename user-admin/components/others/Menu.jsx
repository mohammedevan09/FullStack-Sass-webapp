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
  LogoutIcon,
} from '../../staticData/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveMenu, setOpenMenu } from '@/store/reducers/activeReducer'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { redirect, useRouter } from 'next/navigation'
import LogoutModal from '../modals/menuModals/LogoutModal'

const Menu = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const { currentActiveMenu, openMenu } = useSelector((state) => state?.active)
  const { userInfo } = useSelector((state) => state?.user)

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

  useEffect(() => {
    if (!userInfo?._id) {
      redirect('/login')
    }
  }, [userInfo, router])

  return (
    <div
      className={`text-center h-screen xl:static absolute z-[99] left-0 transition-all duration-500 ease-linear md:text-lg text-base ${
        openMenu ? 'left-0' : 'left-[-120%]'
      }`}
    >
      <div
        className={`fixed bg-blue-800 rounded-tr-[20px] rounded-br-[20px] pb-5`}
      >
        <div className="md:w-[121px] sm:w-[110px] w-[100px] lg:py-5 py-3 mx-auto divide-slate-700 flex justify-start items-center">
          <Image
            src={'/images/logo.png'}
            width={300}
            height={300}
            alt="logo"
            className="h-auto cursor-pointer"
            onClick={() => router.push('')}
          />
          <div
            className="absolute lg:right-2 right-[-8px] rounded-full p-1 xl:hidden block cursor-pointer"
            onClick={() => dispatch(setOpenMenu(false))}
          >
            <CloseMenuIcon size={isSmallScreen ? '19' : '22'} />
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300" />
        <div className="grid justify-between gap-14 items-start h-screen overflow-y-scroll login-scroll">
          <div className="grid justify-center items-start text-[#e0f3ff]">
            {MenuData?.map((item, i) => (
              <motion.div whileHover={{ scale: 1.04 }} key={i}>
                <Link
                  href={item?.link}
                  className={`flex justify-start items-center gap-3 font-medium lg:px-[51px] md:px-[20px] px-[10px] py-3 ${
                    currentActiveMenu === i && 'text-[#ffffff] bg-[#ffffff3b]'
                  }`}
                  onClick={() => {
                    dispatch(setActiveMenu(i))
                    dispatch(setOpenMenu(false))
                  }}
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
                  <div>{item?.name}</div>
                </Link>
              </motion.div>
            ))}
            <div className="text-center py-32">
              <motion.div whileHover={{ scale: 1.04 }}>
                <Link
                  href={'/dashboard/settings'}
                  className={`flex justify-center items-center gap-1 font-medium lg:px-[51px] md:px-[20px] px-[10px] py-3 mr-2 ${
                    currentActiveMenu === 12 && 'text-blue-800 bg-[#0000ff30]'
                  }`}
                  onClick={() => {
                    dispatch(setActiveMenu(12))
                    dispatch(setOpenMenu(false))
                  }}
                >
                  <div
                    className={`flex-col justify-center items-center inline-flex hover:menu-color ${
                      currentActiveMenu === 12 && 'menu-color'
                    }`}
                  >
                    <SettingsIcon />
                  </div>
                  <div>Settings</div>
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="py-2 px-5 mt-2 bg-white rounded-lg text-blue-600 text-base flex justify-center items-center mx-auto gap-3 font-semibold"
                onClick={() => setLogoutModal(true)}
              >
                <LogoutIcon /> <div>Logout</div>
              </motion.button>
            </div>
          </div>
          {logoutModal && (
            <LogoutModal
              openModal={logoutModal}
              setOpenModal={setLogoutModal}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Menu
