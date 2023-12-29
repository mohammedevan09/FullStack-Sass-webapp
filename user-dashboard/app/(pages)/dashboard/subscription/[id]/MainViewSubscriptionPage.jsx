'use client'

import {
  BackButtonIcon,
  DownloadIcon,
  FilterByIdIcon,
  LastUpdateIcon,
} from '@/staticData/Icon'
import { dropData4, fakeMessageData } from '@/staticData/MainData'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MainViewSubscriptionPage = ({ params }) => {
  const projectTracking = [
    {
      track: 'To do',
      names: [
        {
          title: 'UI Design in figma',
        },
        {
          title: 'Development in wordpress',
        },
        {
          title: 'Copywriting',
        },
        {
          title: 'QA testing',
        },
      ],
    },
    {
      track: 'In progress',
      names: [
        {
          title: 'Wireframing in figma',
        },
      ],
    },
    {
      track: 'Complete',
      names: [
        {
          title: 'User avartar design',
        },
        {
          title: 'Market & competetor analysis',
        },
      ],
    },
  ]
  const [dropOpen, setDropOpen] = useState(false)

  const dropRef = useRef()

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [dropRef])

  return (
    <div className="sm:my-14 my-8 sm:px-4 xs:px-3 px-1">
      <motion.button whileHover={{ scale: 1.1 }}>
        <Link
          href={'/dashboard/all-projects'}
          className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1"
        >
          <BackButtonIcon /> Go Back
        </Link>
      </motion.button>
      <div className="sm:flex grid justify-between items-start sm:mb-14 mb-8">
        <div>
          <h1 className="text-2xl font-semibold">
            New Website design & development in Wordpress
          </h1>
          <h6 className="text-base font-normal py-4">Order ID #{params?.id}</h6>
        </div>
        <div className="relative w-[175px] font-medium">
          <div className="bg-white py-1 px-3 sm:bg-opacity-40 rounded-[5px] absolute text-base">
            <button
              className="flex justify-center items-center gap-1"
              onClick={(e) => {
                e.preventDefault()
                setDropOpen((prev) => !prev)
              }}
              ref={dropRef}
            >
              Take Action <FilterByIdIcon />
            </button>
            <div
              className={`grid justify-normal items-center gap-3 overflow-hidden ${
                dropOpen ? 'h-full mt-2' : 'h-0'
              }`}
            >
              {dropData4?.map((item, i) => (
                <div key={i}>
                  <button className="border-t pt-3 border-zinc-400 hover:text-blue-600">
                    {item?.title}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`sm:flex grid sm:justify-start items-center md:gap-20 sm:gap-16 gap-6 lg:mt-24 mt-16 sm:mb-12 mb-5`}
      >
        <div className="py-3 px-14 sm:w-auto w-full text-stone-900 text-lg font-semibold tracking-tight bg-green-500 bg-opacity-20 rounded-[20px]">
          <div className="mx-auto text-center">
            <LastUpdateIcon />
          </div>

          <div className="mx-auto text-center">
            <h3>Last update:</h3>
            <h3>02/12/2023</h3>
          </div>
        </div>
        <div className="grid sm:gap-10 gap-3 justify-center">
          <h6 className="text-lg">
            Download Maintenance Report of:{' '}
            <span className="font-semibold">Januray</span>
          </h6>
          <button
            className="w-[163px] h-[51px] btn-hover
           rounded-[15px] text-xl font-medium flex items-center justify-center gap-1 sm:mx-0 mx-auto"
          >
            <DownloadIcon /> Download
          </button>
        </div>
      </div>
      <div className="border border-stone-300 sm:mt-12 mt-6 mb-7" />
      <h1 className="text-2xl font-semibold pb-5">Project Traction Board</h1>
      <div className="md:flex grid md:gap-0 gap-8 md:justify-between items-start pt-5 pb-20 md:px-10 px-5 bg-white rounded-[20px] md:text-base text-sm font-medium">
        {projectTracking?.map((item, i) => {
          return (
            <div key={i} className="w-full text-center">
              <div className="border border-stone-300 my-5 md:hidden block" />
              <div
                className={`w-[130px] h-[34px] bg-opacity-20 rounded-[5px] flex justify-center items-center gap-2 md:mb-0 mb-10 mx-auto ${
                  item?.track?.toLocaleLowerCase() === 'to do'
                    ? 'bg-rose-600'
                    : item?.track?.toLocaleLowerCase() === 'complete'
                    ? 'bg-green-500'
                    : 'bg-blue-600'
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    item?.track?.toLocaleLowerCase() === 'to do'
                      ? 'bg-rose-600'
                      : item?.track?.toLocaleLowerCase() === 'complete'
                      ? 'bg-green-500'
                      : 'bg-blue-600'
                  }`}
                />
                {item?.track}
              </div>
              <div className="border border-stone-300 my-5 md:block hidden" />
              <div className="grid gap-5 justify-center font-medium">
                {item?.names?.map((subitem, index) => {
                  if (subitem?.title && subitem.title.trim() !== '') {
                    return (
                      <div
                        key={index + i * Math.random()}
                        className={`text-neutral-700 font-normal rounded-[5px] border border-neutral-400 tracking-tight py-2 px-6 text-center md:w-[247px] w-[300px]`}
                      >
                        {subitem?.title}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          )
        })}
      </div>
      <h1 className="text-2xl font-semibold pt-10 pb-5">Inbox & Messaging</h1>
      <div className="grid items-start pt-8 pb-5 md:px-10 px-3 bg-white rounded-[20px] w-full">
        <div className="md:flex grid justify-between items-start w-full md:gap-0 gap-5">
          <div className="grid md:justify-start justify-center">
            <h1 className="lg:text-2xl sm:text-xl text-base font-semibold">
              New Website design & development in Wordpress
            </h1>
            <h6 className="sm:text-base text-sm font-normal lg:py-4 py-2">
              Order ID #{params?.id}
            </h6>
          </div>
          <div className="flex items-center gap-3">
            <div className="lg:w-[65px] sm:w-[50px] w-[40px]">
              <Image
                src={'/images/demo.jpg'}
                alt="img"
                width={500}
                height={500}
                className="lg:h-[65px] sm:h-[50px] h-[40px] rounded-full object-cover"
              />
            </div>
            <div className="grid lg:gap-1">
              <h1 className="lg:text-[22px] sm:text-xl text-base font-semibold">
                Jack Johnson
              </h1>
              <h4 className="sm:text-base text-sm">Project manager</h4>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-zinc-600 mb-6 md:mt-0 mt-6" />
        <div className="grid gap-4 w-full">
          {fakeMessageData?.map((item, i) => (
            <div className="flex gap-2 w-full" key={i}>
              <div className="w-[50px]">
                <Image
                  src={item?.image}
                  width={200}
                  height={200}
                  alt="person"
                  className="h-[50px] object-cover"
                />
              </div>
              <div className="w-full grid">
                <h1 className="font-semibold">{item?.name}</h1>
                <h2>{item?.message}</h2>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full border-zinc-300 border-2 rounded-md p-2 mt-6">
          <input
            type="text"
            className="w-full pb-2"
            placeholder="Write a message #"
          />
          {/* <div className="h-[1px] w-full bg-zinc-200" /> */}
        </div>
      </div>
    </div>
  )
}

export default MainViewSubscriptionPage
