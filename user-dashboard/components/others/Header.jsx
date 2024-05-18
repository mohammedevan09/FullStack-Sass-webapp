'use client'

import {
  getAllMessageNotification,
  getAllNotification,
  readAllMessageNotificationApi,
  readMessageNotificationApi,
  updateManyNotificationApi,
  updateOneNotificationApi,
} from '@/api/notificationApi'
import {
  DownIcon,
  DropNotificationIcon,
  DropProfileIcon,
  DropUpIcon,
  MenuIcon,
  MessageIcon,
  MessageIcon2,
  NotificationBellIcon,
  NotificationIcon,
  SearchIcon,
  StoreIcon,
} from '@/staticData/Icon'
import { setOpenMenu } from '@/store/reducers/activeReducer'
import JsonToText from '@/utils/JsonToText'
import { makeCapitalize } from '@/utils/StatusColor'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import ResponsivePagination from 'react-responsive-pagination'
import socketIOClient from 'socket.io-client'

export const dropdownData = [
  {
    title: 'Profile',
    icon: <DropProfileIcon />,
    link: '/dashboard/settings',
  },
  {
    title: 'Notification',
    icon: <DropNotificationIcon />,
    link: '/dashboard/settings/notifications',
  },
]

const Header = () => {
  const [show, setShow] = useState('top')
  const [lastScrollY, setLastScrollY] = useState(0)

  const { userInfo } = useSelector((state) => state?.user)

  const [dropOpen, setDropOpen] = useState(false)
  const [notificationDropOpen, setNotificationDropOpen] = useState(false)
  const [messageDropOpen, setMessageDropOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const notificationRef = useRef()
  const messageRef = useRef()

  useEffect(() => {
    const handleClick = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target) &&
        e.target.className !== 'page-link prevent'
      ) {
        setNotificationDropOpen(false)
      }
      if (
        messageRef.current &&
        !messageRef.current.contains(e.target) &&
        e.target.className !== 'page-link prevent'
      ) {
        setMessageDropOpen(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [notificationRef, messageRef])

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
    const controlNavbar = () => {
      if (window.scrollY > (isSmallScreen ? 30 : 90)) {
        if (window.scrollY > lastScrollY) {
          setShow('hide')
        } else {
          setShow('show')
        }
      } else {
        setShow('top')
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY, isSmallScreen])

  useEffect(() => {
    const socket = socketIOClient(process.env.NEXT_PUBLIC_HOST)
    if (userInfo) {
      socket.emit('add-user', { userId: userInfo?._id })
    }
  }, [userInfo])

  return (
    <header className={`sticky z-30`}>
      <nav
        className={`flex justify-between items-center lg:gap-28 sm:gap-4 py-4 2xl:w-[1200px] lg:w-[1000px] w-screen sm:px-4 xs:px-3 px-1 fixed ${show} transition-all duration-500 ease rounded-lg`}
      >
        <div
          className="xl:invisible visible cursor-pointer"
          onClick={() => dispatch(setOpenMenu(true))}
        >
          <MenuIcon size={isSmallScreen && '25'} />
        </div>
        <div className="flex bg-white sm:rounded-xl rounded-md justify-start items-center lg:gap-4 gap-1 sm:py-2 py-1 px-4 mx-1 font-medium svg-shadow">
          <SearchIcon size={isSmallScreen && '15'} />
          <input
            type="text"
            className="outline-none text-sm lg:w-[250px] md:w-[200px] sm:w-[160px] xs:w-[120px] w-[90px]"
            placeholder="Search Anything Here..."
          />
        </div>
        <div className="flex justify-center items-start md:gap-6 xs:gap-3 gap-2">
          <div className="relative" ref={notificationRef}>
            <NotificationComp
              isSmallScreen={isSmallScreen}
              setNotificationDropOpen={setNotificationDropOpen}
              notificationDropOpen={notificationDropOpen}
              IconOne={NotificationIcon}
              IconTwo={NotificationBellIcon}
              userInfo={userInfo}
              api={(data) => getAllNotification(data)}
              updateOneApi={(updateItem) =>
                updateOneNotificationApi({ read: true }, updateItem?._id)
              }
              updateAllApi={() =>
                updateManyNotificationApi(
                  { userId: userInfo?._id, read: false },
                  { read: true }
                )
              }
            />
          </div>
          <div className="relative" ref={messageRef}>
            <NotificationComp
              isSmallScreen={isSmallScreen}
              setNotificationDropOpen={setMessageDropOpen}
              notificationDropOpen={messageDropOpen}
              IconOne={MessageIcon}
              IconTwo={MessageIcon2}
              userInfo={userInfo}
              api={(data) => getAllMessageNotification(data)}
              updateOneApi={(updateItem) =>
                readMessageNotificationApi(
                  { userId: userInfo?._id },
                  updateItem?.id
                )
              }
              updateAllApi={() =>
                readAllMessageNotificationApi({ userId: userInfo?._id })
              }
            />
          </div>
          <div className="relative sm:w-[150px] w-[130px] z-10 sm:text-base text-sm">
            <div className="bg-white grid items-center px-4 py-1 rounded-md overflow-hidden absolute z-10 svg-shadow">
              <button
                className="flex items-center gap-2 font-semibold"
                onClick={(e) => {
                  e.preventDefault()
                  setDropOpen((prev) => !prev)
                }}
              >
                {userInfo?.fullName?.split(' ')[0]}{' '}
                <DownIcon size={isSmallScreen && '13'} />
              </button>
              <div
                className={`${
                  dropOpen ? 'max-h-[400px]' : 'max-h-0'
                } transition-all duration-500 ease-in-out font-semibold`}
              >
                {dropdownData?.map((item, i) => (
                  <div key={i}>
                    <button
                      className="flex justify-center items-center gap-2 mt-2 hover:underline"
                      onClick={() => {
                        router.push(`${item?.link}?userId=${userInfo?._id}`)
                      }}
                    >
                      {item?.icon} {item?.title}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export const NotificationComp = ({
  notificationDropOpen,
  isSmallScreen,
  setNotificationDropOpen,
  IconOne,
  IconTwo,
  userInfo,
  api,
  updateOneApi,
  updateAllApi,
}) => {
  const [notificationData, setNotificationData] = useState([])
  const [currenPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchNotification = async () => {
      const resData = await api({
        userId: userInfo?._id,
        role: 'user',
        page: currenPage,
        limit: 10,
      })
      setNotificationData(resData)
    }
    fetchNotification()
  }, [userInfo, currenPage])

  return (
    <>
      <div
        className="rounded-lg relative cursor-pointer"
        onClick={() => setNotificationDropOpen((prev) => !prev)}
      >
        <div className="absolute rounded-full bg-blue-800 top-0 left-0 w-4 text-[11px] flex justify-center items-center text-white">
          {(notificationData?.unreadCount > 9
            ? '9+'
            : notificationData?.unreadCount) || 0}
        </div>
        <IconOne size={isSmallScreen && '28'} />
      </div>
      {notificationDropOpen && (
        <div className="relative">
          <div className="-mb-2 absolute left-1">
            <DropUpIcon />
          </div>
          <div className="absolute sm:w-[358px] w-[300px] max-h-[400px] overflow-y-scroll bg-white rounded-[15px] dropdown-shadow2 sm:-right-[400%] right-[-350%] top-4 sm:p-4 p-3 z-50">
            {notificationData?.notifications?.length === 0 ? (
              <h2 className="py-6 text-gray-400 text-center font-semibold italic">
                No Notification to show
              </h2>
            ) : (
              <>
                <div className={`grid sm:gap-4 gap-2 mb-3`}>
                  <div
                    className={`cursor-pointer text-sm border-b border-stone-300 text-center font-semibold ${
                      (notificationData?.unreadCount <= 0 ||
                        !notificationData?.unreadCount) &&
                      'text-gray-400 italic'
                    }`}
                    onClick={async () => {
                      if (notificationData?.unreadCount > 0) {
                        setNotificationData((prev) => {
                          return { ...prev, unreadCount: 0 }
                        })
                        await updateAllApi()
                      }
                    }}
                  >
                    Mark all as read
                  </div>
                  {notificationData?.notifications?.map((item, i) => (
                    <SingleNotification
                      item={item}
                      i={i}
                      key={i}
                      IconTwo={IconTwo}
                      unreadCount={notificationData?.unreadCount}
                      userInfo={userInfo}
                      updateOneApi={updateOneApi}
                    />
                  ))}
                  <ResponsivePagination
                    total={
                      Math.ceil(notificationData?.totalDocsCount / 10) || 1
                    }
                    current={currenPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    pageLinkClassName="page-link prevent"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export const SingleNotification = ({
  item,
  i,
  IconTwo,
  unreadCount,
  userInfo,
  updateOneApi,
}) => {
  const [isRead, setIsRead] = useState(item?.read || item?.receivers?.[0]?.read)

  return (
    <div
      key={i}
      className="flex items-center justify-start gap-2 border-b border-stone-300 pb-2 font-medium"
    >
      <div>
        <IconTwo />
      </div>
      <div className="grid sm:gap-3 gap-2">
        <div className="grid sm:gap-[2px]">
          <Link
            href={`/dashboard/${getCorrectLink(item)}?userId=${userInfo?._id}`}
            className={`sm:text-sm text-[13px] font-bold truncate max-h-[1.2rem] tiptap ${
              (isRead || unreadCount <= 0) && 'text-gray-500'
            }`}
          >
            {typeof item?.title === 'object'
              ? JsonToText(item?.title, false)
              : item?.title}
          </Link>
          <div
            className={`text-xs truncate ${
              (isRead || unreadCount <= 0) && 'text-gray-500'
            }`}
          >
            {item?.content}
          </div>
        </div>
        <div className="flex gap-3 text-xs">
          <Link
            href={`/dashboard/${getCorrectLink(item)}?userId=${userInfo?._id}`}
            className="text-blue-800 underline"
          >
            See Details
          </Link>
          {isRead || unreadCount <= 0 ? (
            <div className="text-gray-500 italic">Read</div>
          ) : (
            <div
              className="cursor-pointer underline"
              onClick={async () => {
                if (!isRead) {
                  setIsRead(true)
                  await updateOneApi(item)
                }
              }}
            >
              Mark as read
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const getCorrectLink = (val) => {
  if (
    val?.type === 'Ticket' ||
    val?.type === 'Proposal' ||
    val?.type === 'Meeting'
  ) {
    return `${val?.type?.toLowerCase()}s/${val?.id}`
  } else if (val?.type === 'Order') {
    return `orders/${val?.idDetails?.__t
      .replace('Order', '')
      .replace(/^\w/, (c) => c.toLowerCase())}/${val?.id}`
  } else {
    return '#'
  }
}

export default Header
