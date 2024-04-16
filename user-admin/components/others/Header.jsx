'use client'

import {
  DownIcon,
  DropUpIcon,
  MenuIcon,
  MessageIcon,
  MessageIcon2,
  NotificationBellIcon,
  NotificationIcon,
  SearchIcon,
} from '@/staticData/Icon'
import { dropdownData, notificationDropDownData } from '@/staticData/MainData'
import { setOpenMenu } from '@/store/reducers/activeReducer'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

const Header = () => {
  const [show, setShow] = useState('top')
  const [lastScrollY, setLastScrollY] = useState(0)

  const [dropOpen, setDropOpen] = useState(false)
  const [notificationDropOpen, setNotificationDropOpen] = useState(false)
  const [messageDropOpen, setMessageDropOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  const dropRef = useRef()
  const notificationRef = useRef()
  const messageRef = useRef()

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false)
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotificationDropOpen(false)
      }
      if (messageRef.current && !messageRef.current.contains(e.target)) {
        setMessageDropOpen(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [dropRef, notificationRef, messageRef])

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

  return (
    <header className={`sticky z-30`}>
      <nav
        className={`flex justify-between items-center lg:gap-28 sm:gap-4 gap-2 py-4 2xl:w-[1200px] lg:w-[1000px] w-screen sm:px-4 xs:px-3 px-1 fixed ${show} transition-all duration-500 ease rounded-lg`}
      >
        <div
          className="xl:invisible visible cursor-pointer"
          onClick={() => dispatch(setOpenMenu(true))}
        >
          <MenuIcon size={isSmallScreen && '25'} />
        </div>
        <div className="flex lg:w-[438px] sm:w-[300px] xs:w-[200px] w-[170px] lg:h-[52px] sm:h-[40px] h-[35px] bg-white sm:rounded-xl rounded-md justify-start items-center lg:gap-4 gap-1 sm:p-3 p-0 pl-1">
          <SearchIcon size={isSmallScreen && '15'} />
          <input
            type="text"
            className="outline-none lg:w-[300px] sm:w-[270px] xs:w-[190px] w-[129px] lg:text-[18px] sm:text-[15px] text-[13px]"
            placeholder="Search Anything Here..."
          />
        </div>
        <div className="flex justify-center items-start md:gap-6 xs:gap-3 gap-1">
          <div className="relative" ref={messageRef}>
            <div
              className="rounded-lg relative w-10 h-10 cursor-pointer"
              onClick={() => setMessageDropOpen((prev) => !prev)}
            >
              <div className="absolute p-1 rounded-full bg-blue-800 top-0 left-0 h-[18px] w-[18px] text-xs flex justify-center items-center text-white">
                9+
              </div>
              <MessageIcon size={isSmallScreen && '32'} />
            </div>
            {messageDropOpen && (
              <div className="relative">
                <div className="-mb-2 absolute left-2">
                  <DropUpIcon />
                </div>
                <div className="absolute sm:w-[358px] w-[300px] bg-white rounded-[15px] dropdown-shadow2 sm:-right-[400%] right-[-300%] top-4 sm:p-4 p-3 z-50">
                  <div className="grid sm:gap-4 gap-2">
                    {notificationDropDownData?.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-start gap-2 border-b border-stone-300 pb-2"
                      >
                        <div>
                          <MessageIcon2 />
                        </div>
                        <div className="grid sm:gap-3 gap-2">
                          <div className="grid sm:gap-[2px]">
                            <div className="sm:text-[16px] text-[13px] font-bold">
                              {item?.title}
                            </div>
                            <div className="sm:text-[14px] text-xs font-normal">
                              {item?.description}
                            </div>
                          </div>
                          <div className="flex gap-3 underline sm:text-[14px] text-xs">
                            <button className="text-blue-800 font-normal">
                              See Details
                            </button>
                            <button className="text-zinc-900 font-normal">
                              Mark as read
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-1">
                    <button className="text-blue-800 sm:text-[14px] text-xs font-normal underline">
                      See all notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative" ref={notificationRef}>
            <div
              className="rounded-lg relative w-10 h-10 cursor-pointer"
              onClick={() => setNotificationDropOpen((prev) => !prev)}
            >
              <div className="absolute p-1 rounded-full bg-blue-800 top-0 left-1 h-[18px] w-[18px] text-xs flex justify-center items-center text-white">
                0
              </div>
              <NotificationIcon size={isSmallScreen && '28'} />
            </div>
            {notificationDropOpen && (
              <div className="relative">
                <div className="-mb-2 absolute left-2">
                  <DropUpIcon />
                </div>
                <div className="absolute sm:w-[358px] w-[300px] bg-white rounded-[15px] dropdown-shadow2 sm:-right-[400%] right-[-200%] top-4 sm:p-4 p-3 z-50">
                  <div className="grid sm:gap-4 gap-2">
                    {notificationDropDownData?.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-start gap-2 border-b border-stone-300 pb-2"
                      >
                        <div>
                          <NotificationBellIcon />
                        </div>
                        <div className="grid sm:gap-3 gap-2">
                          <div className="grid sm:gap-[2px]">
                            <div className="sm:text-[16px] text-[13px] font-bold">
                              {item?.title}
                            </div>
                            <div className="sm:text-[14px] text-xs font-normal">
                              {item?.description}
                            </div>
                          </div>
                          <div className="flex gap-3 underline sm:text-[14px] text-xs">
                            <button className="text-blue-800 font-normal">
                              See Details
                            </button>
                            <button className="text-zinc-900 font-normal">
                              Mark as read
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-1">
                    <button className="text-blue-800 sm:text-[14px] text-xs font-normal underline">
                      See all notifications
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="relative sm:w-[150px] w-[82px] z-10">
            <div
              className="dropdown-shadow sm:w-[150px] w-[82px] bg-white py-1 sm:px-3 px-2 font-semibold absolute rounded-lg sm:text-lg text-xs"
              ref={dropRef}
            >
              <button
                className="flex justify-center items-center sm:gap-1 gap-[2px]"
                onClick={(e) => {
                  e.preventDefault()
                  setDropOpen((prev) => !prev)
                }}
              >
                Olivia S. <DownIcon size={isSmallScreen && '13'} />
              </button>
              <div
                className={`grid justify-normal items-center rounded-lg gap-2 overflow-hidden ${
                  dropOpen ? 'h-full mt-2' : 'h-0 '
                }`}
              >
                {dropdownData?.map((item, i) => (
                  <div key={i}>
                    <button
                      className="flex justify-center items-center gap-1 hover:underline"
                      onClick={() => {
                        router.push(item?.link)
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

export default Header
