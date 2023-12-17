'use client'

import {
  BackButtonIcon,
  DownloadIcon,
  FilterByIdIcon,
  LastUpdateIcon,
} from '@/staticData/Icon'
import { dropData4 } from '@/staticData/MainData'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const MainOpenTicketViewPage = ({ params }) => {
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
    <div className="my-14">
      <Link
        href={'/dashboard/subscription'}
        className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1"
      >
        <BackButtonIcon /> Go Back
      </Link>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold">
            New Website design & development in Wordpress
          </h1>
          <h6 className="text-base font-normal py-4">Order ID #{params?.id}</h6>
        </div>
        <div className="relative w-[175px] font-medium">
          <div className="bg-white py-1 px-3 bg-opacity-40 rounded-[5px] absolute text-base">
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
      <div className={`flex justify-start items-center gap-20 mt-24 mb-12`}>
        <div className="py-3 px-14 text-stone-900 text-lg font-semibold tracking-tight bg-green-500 bg-opacity-20 rounded-[20px]">
          <div className="mx-auto text-center">
            <LastUpdateIcon />
          </div>

          <h3>Last update:</h3>
          <h3>02/12/2023</h3>
        </div>
        <div className="grid gap-10">
          <h6 className="text-lg">
            Download Maintenance Report of:{' '}
            <span className="font-semibold">Januray</span>
          </h6>
          <button className="w-[163px] h-[51px] bg-blue-800 rounded-[15px] text-white text-xl font-medium flex items-center justify-center gap-1">
            <DownloadIcon /> Download
          </button>
        </div>
      </div>
      <div className="border border-stone-300 mt-12 mb-7" />
      <h1 className="text-2xl font-semibold pb-5">Project Traction Board</h1>
      <div className="flex justify-between items-start pt-5 pb-20 px-10 bg-white rounded-[20px]">
        {projectTracking?.map((item, i) => {
          return (
            <div key={i} className="w-full text-center">
              <div
                className={`w-[130px] h-[34px] bg-opacity-20 rounded-[5px] flex justify-center items-center gap-2 mx-auto ${
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
              <div className="border border-stone-300 my-5" />
              <div className="grid gap-5 justify-center">
                {item?.names?.map((subitem, index) => {
                  if (subitem?.title && subitem.title.trim() !== '') {
                    return (
                      <div
                        key={index + i * Math.random()}
                        className={`text-neutral-700 text-base font-normal rounded-[5px] border border-neutral-400 tracking-tight py-2 px-6 text-center w-[247px]`}
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
      <div className="grid items-start pt-8 pb-5 px-10 bg-white rounded-[20px] w-full">
        <div className="flex justify-between items-start w-full">
          <div className="grid">
            <h1 className="text-2xl font-semibold">
              New Website design & development in Wordpress
            </h1>
            <h6 className="text-base font-normal py-4">
              Order ID #{params?.id}
            </h6>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-[65px] ">
              <Image
                src={'/images/demo.jpg'}
                alt="img"
                width={500}
                height={500}
                className="h-[65px] rounded-full object-cover"
              />
            </div>
            <div className="grid gap-1">
              <h1 className="text-[22px] font-semibold">Jack Johnson</h1>
              <h4 className="text-base">Project manager</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainOpenTicketViewPage
