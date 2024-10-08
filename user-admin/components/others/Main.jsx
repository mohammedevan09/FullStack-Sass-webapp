'use client'

import { AllProjectsIcon } from '@/staticData/Icon'
// import { projectData } from '@/staticData/MainData'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import DashboardSalesReport from '../charts/DashboardSalesReport'
import { useSelector } from 'react-redux'
import { useLayoutEffect } from 'react'

const Main = () => {
  const router = useRouter()
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)

  const { userInfo } = useSelector((state) => state?.user)

  useLayoutEffect(() => {
    if (!params?.get('userId')) {
      params?.set('userId', userInfo?._id)
      replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [userInfo])

  const data = [
    {
      id: '2022',
      color: 'rgba(79, 70, 229, 1)',
      data: [
        {
          x: 'Jan',
          y: 52,
        },
        {
          x: 'Feb',
          y: 158,
        },
        {
          x: 'Mar',
          y: 50,
        },
        {
          x: 'Apr',
          y: 190,
        },
        {
          x: 'May',
          y: 84,
        },
        {
          x: 'Jun',
          y: 10,
        },
        {
          x: 'Jul',
          y: 280,
        },
        {
          x: 'Aug',
          y: 261,
        },
        {
          x: 'Sep',
          y: 29,
        },
        {
          x: 'Oct',
          y: 52,
        },
        {
          x: 'Nov',
          y: 235,
        },
        {
          x: 'Dec',
          y: 286,
        },
      ],
    },
    {
      id: '2023',
      color: 'rgba(129, 140, 248, 1)',
      data: [
        {
          x: 'Jan',
          y: 28,
        },
        {
          x: 'Feb',
          y: 25,
        },
        {
          x: 'Mar',
          y: 30,
        },
        {
          x: 'Apr',
          y: 28,
        },
        {
          x: 'May',
          y: 70,
        },
        {
          x: 'Jun',
          y: 30,
        },
        {
          x: 'Jul',
          y: 110,
        },
        {
          x: 'Aug',
          y: 161,
        },
        {
          x: 'Sep',
          y: 129,
        },
        {
          x: 'Oct',
          y: 152,
        },
        {
          x: 'Nov',
          y: 135,
        },
        {
          x: 'Dec',
          y: 186,
        },
      ],
    },
  ]

  const statisticsData = [
    {
      title: 'Total  orders',
      value: '543',
      results: '+ 36%',
    },
    {
      title: 'Total Sales',
      value: '$2,38,485',
      results: '- 14%',
    },
    {
      title: 'Total clients',
      value: '16',
      results: '+ 36%',
    },
  ]

  return (
    <>
      <div className="w-full">
        <div className="flex items-end sm:my-12 my-6">
          <div className="grid">
            <span className="text-gray-800 text-xl font-medium ">
              Hi, Olivia S
            </span>

            <span className="text-gray-800 text-[35px] font-bold ">
              Good Afternoon{' '}
            </span>
          </div>
          <span className="w-[49px] ml-2 mb-3">
            <Image
              src={'/images/hello.png'}
              width={500}
              height={500}
              alt="wp sprint"
              className="h-[49px]"
            />
          </span>
        </div>
        <div>
          <div className="sm:flex grid sm:justify-between items-center text-white 2xl:gap-4 gap-2">
            {statisticsData?.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-end  2xl:w-[360px] lg:w-[270px] sm:w-[220px] w-full h-[100px] bg-white p-4 rounded-[10px]"
              >
                <div className="grid justify-between gap-5">
                  <h3 className="text-zinc-500 text-[15px] font-medium uppercase leading-[18px] tracking-wide">
                    {item?.title}
                  </h3>
                  <h2 className="text-zinc-900 text-[22px] font-bold">
                    {item?.value}
                  </h2>
                </div>
                <div
                  className={`leading-[21px] text-[18px] font-medium ${
                    item?.results?.startsWith('-')
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {item?.results}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full sm:mb-14 mb-10 sm:mt-8 mt-6 overflow-x-scroll">
        <DashboardSalesReport data={data} />
      </div>
      <h2 className="text-zinc-700 text-2xl flex justify-start items-center sm:gap-3 gap-2 mt-12">
        <AllProjectsIcon color={'black'} /> Recent Orders
      </h2>
    </>
  )
}

export default Main
