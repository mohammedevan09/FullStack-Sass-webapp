'use client'

import {
  AffiliateIcon,
  CloseMenuIcon,
  FeedbackIcon,
  HowToGuideIcon,
  LogoutIcon,
  SettingsIcon,
  TeamsIcon,
} from '@/staticData/Icon'
import Image from 'next/image'
import Link from 'next/link'

import {
  AllProjectsIcon,
  AllTicketsIcon,
  HomeIcon,
  InvoiceIcon,
  MarketPlaceIcon,
  MeetingIcon,
  ProposalsIcon,
} from '../../staticData/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenMenu } from '@/store/reducers/activeReducer'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { redirect, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import LogoutModal from '../modals/menuModals/LogoutModal'

const Menu = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()
  const activeSegment = useSelectedLayoutSegment()

  const { openMenu } = useSelector((state) => state?.active)

  const { userInfo } = useSelector((state) => state?.user)

  const MenuData = [
    {
      name: 'Dashboard',
      icon: <HomeIcon color="#6C7893" />,
      link: `/dashboard?userId=${userInfo?._id}`,
      targetSegment: null,
    },
    {
      name: 'Services',
      icon: <MarketPlaceIcon color="#6C7893" />,
      link: '/dashboard/services',
      targetSegment: 'services',
    },
    {
      name: 'All Projects',
      icon: <AllProjectsIcon color="#6C7893" />,
      link: `/dashboard/orders?userId=${userInfo?._id}`,
      targetSegment: 'orders',
    },
    {
      name: 'All Tickets',
      icon: <AllTicketsIcon color="#6C7893" />,
      link: `/dashboard/tickets?userId=${userInfo?._id}`,
      targetSegment: 'tickets',
    },
    {
      name: 'Proposals',
      icon: <ProposalsIcon color="#6C7893" />,
      link: `/dashboard/proposals?userId=${userInfo?._id}`,
      targetSegment: 'proposals',
    },
    {
      name: 'Invoice',
      icon: <InvoiceIcon color="#6C7893" />,
      link: `/dashboard/invoice?userId=${userInfo?._id}`,
      targetSegment: 'invoice',
    },
    {
      name: 'Meetings',
      icon: <MeetingIcon color="#6C7893" />,
      link: `/dashboard/meetings?userId=${userInfo?._id}`,
      targetSegment: 'meetings',
    },
    {
      name: 'Team',
      icon: <TeamsIcon color="#6C7893" />,
      link: `/dashboard/team?userId=${userInfo?._id}`,
      targetSegment: 'team',
    },
    {
      name: 'How To Guide',
      icon: <HowToGuideIcon color="#6C7893" />,
      link: '/dashboard/how-to-guide',
      targetSegment: 'how-to-guide',
    },
    {
      name: 'Feedback',
      icon: <FeedbackIcon color="#6C7893" />,
      link: '/dashboard/feedback',
      targetSegment: 'feedback',
    },
    {
      name: 'Affiliate',
      icon: <AffiliateIcon color="#6C7893" />,
      link: `/dashboard/affiliate?userId=${
        userInfo?.creatorId || userInfo?._id
      }`,
      targetSegment: 'affiliate',
    },
  ]

  const filteredMenuData = MenuData.filter((menuItem) => {
    if (userInfo?.creatorId && userInfo?.access) {
      const updatedAccess = {
        ...userInfo.access,
        team: { access: false },
      }

      return (
        !updatedAccess.hasOwnProperty(menuItem.targetSegment) ||
        updatedAccess[menuItem.targetSegment].access === true
      )
    } else {
      return true
    }
  })

  useEffect(() => {
    if (!userInfo?.token) {
      redirect('/login')
    } else if (userInfo?.email_verified === false) {
      redirect('/login/email_verify')
    }
  }, [userInfo, router])

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
      className={`text-center h-screen xl:static absolute z-[99] left-0 transition-all duration-500 ease-linear md:text-lg text-base ${
        openMenu ? 'left-0' : 'left-[-120%]'
      }`}
    >
      <div
        className={`fixed bg-white rounded-tr-[20px] rounded-br-[20px] pb-5`}
      >
        <div className="md:w-[151px] w-[120px] lg:py-5 py-3 mx-auto divide-slate-700 flex gap-2">
          <Image
            src={'/images/logo.png'}
            width={300}
            height={300}
            alt="logo"
            className="md:h-[33px] h-[29px] cursor-pointer"
            onClick={() => router.push('/dashboard')}
          />
          <div
            className="absolute lg:right-2 right-[-8px] rounded-full p-1 xl:hidden block cursor-pointer"
            onClick={() => dispatch(setOpenMenu(false))}
          >
            <CloseMenuIcon size={isSmallScreen ? '19' : '22'} />
          </div>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-gray-300" />
        <div className="grid justify-between gap-14 items-start h-screen overflow-y-scroll">
          <div className="grid justify-center items-start text-slate-500">
            {filteredMenuData?.map((item, i) => (
              <motion.div whileHover={{ scale: 1.04 }} key={i}>
                <Link
                  href={item?.link}
                  className={`flex justify-start items-center gap-3 font-medium lg:px-[51px] md:px-[20px] px-[10px] py-3 rounded-sm ${
                    activeSegment === item?.targetSegment &&
                    'text-blue-800 bg-[#0000ff30]'
                  }`}
                  onClick={() => {
                    dispatch(setOpenMenu(false))
                  }}
                >
                  <div
                    className={`flex-col justify-center items-center flex ${
                      activeSegment === item?.targetSegment && 'menu-color'
                    }
`}
                  >
                    {item?.icon}
                  </div>
                  <div>{item?.name}</div>
                </Link>
              </motion.div>
            ))}
            <div className="text-center my-32">
              <motion.div whileHover={{ scale: 1.04 }}>
                <Link
                  href={`/dashboard/settings?userId=${userInfo?._id}`}
                  className={`flex justify-center items-center gap-1 font-medium lg:px-[51px] md:px-[20px] px-[10px] py-3 ${
                    activeSegment === 'settings' &&
                    'text-blue-800 bg-[#0000ff30]'
                  }`}
                  onClick={() => {
                    dispatch(setOpenMenu(false))
                  }}
                >
                  <div
                    className={`flex-col justify-center items-center inline-flex hover:menu-color ${
                      activeSegment === 'settings' && 'menu-color'
                    }`}
                  >
                    <SettingsIcon />
                  </div>
                  <div className="mr-2">Settings</div>
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="py-2 px-5 mt-2 bg-blue-800 rounded-lg text-white text-base flex justify-center items-center mx-auto gap-3 font-semibold"
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
