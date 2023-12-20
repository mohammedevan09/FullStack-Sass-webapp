'use client'

import { BackButtonIcon, FilterByIdIcon } from '@/staticData/Icon'
import { dropData2 } from '@/staticData/MainData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MainViewAllProjectsPage = ({ params }) => {
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

  const router = useRouter()

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
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => router.back()}
        className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1"
      >
        <BackButtonIcon /> Go Back
      </motion.button>
      <div className="xs:flex grid justify-between xs:items-start items-end">
        <div>
          <h1 className="md:text-2xl sm:text-xl text-base font-semibold">
            New Website design & development in Wordpress
          </h1>
          <h6 className="text-base font-normal py-4">Order ID #{params?.id}</h6>
        </div>
        <div className="relative sm:w-[165px] w-[150px]">
          <div className="bg-white py-1 px-3 rounded-[5px] absolute sm:text-base text-sm font-medium xs:mt-0 mt-14">
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
              {dropData2?.map((item, i) => (
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
        className={`w-[117px] h-[34px] bg-opacity-20 rounded-[20px] flex justify-center items-center gap-2 bg-blue-600`}
      >
        <div className={`w-2.5 h-2.5 rounded-full bg-blue-600`} />
        Running
      </div>
      <div className="border border-stone-300 xs:mt-12 mt-20 xs:mb-7 mb-4" />
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
        <div className="md:flex grid md:justify-between justify-center items-start w-full md:gap-0 gap-5">
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
      </div>
    </div>
  )
}

export default MainViewAllProjectsPage
