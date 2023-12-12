'use client'

import {
  DownIcon,
  DropUpIcon,
  MessageIcon,
  NotificationBellIcon,
  NotificationIcon,
  SearchIcon,
  StoreIcon,
} from '@/staticData/Icon'
import { dropdownData, notificationDropDownData } from '@/staticData/MainData'
import { useEffect, useRef, useState } from 'react'

const Header = () => {
  const [dropOpen, setDropOpen] = useState(false)
  const [notificationDropOpen, setNotificationDropOpen] = useState(false)
  const [messageDropOpen, setMessageDropOpen] = useState(false)

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

  return (
    <div className="flex justify-end items-start gap-28 my-5">
      <div></div>
      <div className="flex w-[438px] h-[52px] bg-white rounded-xl justify-start items-center gap-4 p-3">
        <SearchIcon />
        <input
          type="text"
          className="outline-none"
          placeholder="Search Anything Here..."
        />
      </div>
      <div className="flex justify-center items-start gap-6">
        <div className="relative" ref={messageRef}>
          <div
            className="rounded-lg relative w-10 h-10 cursor-pointer"
            onClick={() => setMessageDropOpen((prev) => !prev)}
          >
            <div className="absolute p-1 rounded-full bg-blue-800 top-0 left-0 h-[18px] w-[18px] text-xs flex justify-center items-center text-white">
              2
            </div>
            <MessageIcon />
          </div>
          {messageDropOpen && (
            <div className="relative">
              <div className="-mb-2 absolute left-2">
                <DropUpIcon />
              </div>
              <div className="absolute w-[358px] bg-white rounded-[15px] dropdown-shadow2 -right-[400%] top-4 p-4">
                <div className="grid gap-4">
                  {notificationDropDownData?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-start gap-2 border-b border-stone-300 pb-2"
                    >
                      <div>
                        <NotificationBellIcon />
                      </div>
                      <div className="grid gap-2">
                        <div>
                          <div className="text-[13px] font-bold">
                            {item?.title}
                          </div>
                          <div className="text-xs font-normal">
                            {item?.description}
                          </div>
                        </div>
                        <div className="flex gap-3 underline">
                          <span className="text-blue-800 text-xs font-normal">
                            See Details
                          </span>
                          <span className="text-zinc-900 text-xs font-normal">
                            Mark as read
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-1">
                  <button className="text-blue-800 text-xs font-normal underline">
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
            <NotificationIcon />
          </div>
          {notificationDropOpen && (
            <div className="relative">
              <div className="-mb-2 absolute left-2">
                <DropUpIcon />
              </div>
              <div className="absolute w-[358px] bg-white rounded-[15px] dropdown-shadow2 -right-[400%] top-4 p-4">
                <div className="grid gap-4">
                  {notificationDropDownData?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-start gap-2 border-b border-stone-300 pb-2"
                    >
                      <div>
                        <NotificationBellIcon />
                      </div>
                      <div className="grid gap-2">
                        <div>
                          <div className="text-[13px] font-bold">
                            {item?.title}
                          </div>
                          <div className="text-xs font-normal">
                            {item?.description}
                          </div>
                        </div>
                        <div className="flex gap-3 underline">
                          <span className="text-blue-800 text-xs font-normal">
                            See Details
                          </span>
                          <span className="text-zinc-900 text-xs font-normal">
                            Mark as read
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-1">
                  <button className="text-blue-800 text-xs font-normal underline">
                    See all notifications
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="relative w-[150px]">
          <div
            className="dropdown-shadow bg-white py-1 px-3 font-semibold bg-opacity-40 rounded-lg absolute"
            ref={dropRef}
          >
            <button
              className="flex justify-center items-center gap-1"
              onClick={(e) => {
                e.preventDefault()
                setDropOpen((prev) => !prev)
              }}
            >
              Olivia S. <DownIcon />
            </button>
            <div
              className={`grid justify-normal items-center gap-2 overflow-hidden ${
                dropOpen ? 'h-full mt-2' : 'h-0'
              }`}
            >
              {dropdownData?.map((item, i) => (
                <div key={i}>
                  <button className="flex justify-center items-center gap-1 hover:underline">
                    {item?.icon} {item?.title}
                  </button>
                </div>
              ))}
            </div>
          </div>{' '}
        </div>
      </div>
    </div>
  )
}

export default Header
