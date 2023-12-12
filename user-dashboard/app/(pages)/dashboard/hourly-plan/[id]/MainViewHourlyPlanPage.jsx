'use client'

import {
  BackButtonIcon,
  FilterByIdIcon,
  HourlyLogoIcon,
  RemainingHoursIcon,
  SpentHourIcon,
} from '@/staticData/Icon'
import { dropData3 } from '@/staticData/MainData'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const MainViewHourlyPlanPage = ({ params }) => {
  const [dropOpen, setDropOpen] = useState(false)

  const hoursData = [
    {
      title: 'Total Hours',
      hours: '60',
      icon: <HourlyLogoIcon />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'Spent Hours',
      hours: '60',
      icon: <SpentHourIcon />,
      bgColor: 'bg-sky-500',
    },
    {
      title: 'Remain Hours',
      hours: '60',
      icon: <RemainingHoursIcon />,
      bgColor: 'bg-rose-600',
    },
  ]
  const hourlyTimeLogs = [
    {
      title: 'Theme customization of beldo Co',
      description:
        'We’ve done all the customization of th  project in just 1 hour.',
      date: '02/01/203',
      times: '10AM-11AM',
      loggedHours: '1 Hour',
      loggedMinutes: '00 Minute',
    },
    {
      title: 'Theme customization of beldo Co',
      description:
        'We’ve done all the customization of th  project in just 1 hour.',
      date: '02/01/203',
      times: '10AM-11AM',
      loggedHours: '1 Hour',
      loggedMinutes: '00 Minute',
    },
    {
      title: 'Theme customization of beldo Co',
      description:
        'We’ve done all the customization of th  project in just 1 hour.',
      date: '02/01/203',
      times: '10AM-11AM',
      loggedHours: '1 Hour',
      loggedMinutes: '00 Minute',
    },
  ]
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
        href={'/dashboard/hourly-plan'}
        className="flex justify-start items-center w-[120px] gap-1 mb-10 font-semibold text-xl -ml-1"
      >
        <BackButtonIcon /> Go Back
      </Link>
      <div className="flex justify-between items-start mb-14">
        <div>
          <h1 className="text-2xl font-semibold">
            100 Hours development bucket
          </h1>
          <h6 className="text-base font-normal py-4">Order ID #{params?.id}</h6>
        </div>
        <div className="relative w-[165px]">
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
              {dropData3?.map((item, i) => (
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
      <div className="flex gap-9 items-center">
        {hoursData?.map((item, i) => (
          <div
            key={i}
            className={`w-[212px] grid justify-center items-center py-[14px] gap-2 bg-opacity-20 rounded-[20px] ${item?.bgColor}`}
          >
            <div className="mx-auto">{item?.icon}</div>
            <h3 className="text-stone-900 text-2xl tracking-tight">
              {item?.title}:
              <span className="text-neutral-950 font-bold"> {item?.hours}</span>
            </h3>
          </div>
        ))}
      </div>
      <div className="border border-stone-300 mt-12 mb-7" />
      <h1 className="text-2xl font-semibold">Hourly Time logs</h1>
      <div className="w-full bg-white rounded-[20.37px] px-7 py-8 my-14">
        <table className="w-full ">
          <tbody>
            <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
              <th>#tasks & Memo</th>
              <th className="text-center">Time & Date</th>
              <th className="text-center">Logged Hours</th>
            </tr>

            {hourlyTimeLogs?.map((item, i) => (
              <tr key={i}>
                <td className="py-7 w-[450px]">
                  <div className="text-xl font-normal grid justify-start items-center gap-2">
                    <div className="text-xl font-medium">{item?.title}</div>
                    <div className="text-base">{item?.description}</div>
                  </div>
                </td>
                <td className="py-7">
                  <div className="text-zinc-700 text-xl grid justify-center items-center gap-2 font-medium">
                    <div className="mx-auto">{item?.date}</div>
                    <div className="mx-auto">{item?.times}</div>
                  </div>
                </td>
                <td className="py-7">
                  <div className="text-zinc-700 text-xl grid justify-center font-medium items-center gap-2">
                    <div className="mx-auto">{item?.loggedHours}</div>
                    <div className='className="mx-auto"'>
                      {item?.loggedMinutes}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default MainViewHourlyPlanPage
