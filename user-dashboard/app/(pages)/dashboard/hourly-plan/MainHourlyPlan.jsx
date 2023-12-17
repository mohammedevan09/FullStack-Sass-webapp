'use client'

import {
  AddProjectIcon,
  FilterByIdIcon,
  SearchByIdIcon,
} from '@/staticData/Icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { filterByStatusData } from '@/staticData/MainData'
import { useEffect, useRef, useState } from 'react'

const MainHourlyPlan = ({ projects }) => {
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
  }, [])
  return (
    <>
      <div className="sm:px-4 xs:px-3 px-1">
        <Link
          href={'/dashboard/marketplace/hourlyPlan'}
          className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-1 sm:w-[190px] w-[150px] flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow border-2 border-blue-800 text-blue-800 lg:text-xl text-lg font-medium"
        >
          <AddProjectIcon /> Add Plan
        </Link>
        <div className="sm:flex grid justify-between items-center sm:gap-[none] gap-5 ">
          <h2 className="text-2xl font-semibold">All Projects</h2>
          <div className="flex md:gap-9 gap-3 sm:">
            <div className="flex sm:px-4 px-1 py-[7px] bg-white rounded-xl justify-start items-center sm:gap-4 gap-1">
              <SearchByIdIcon />
              <input
                type="text"
                className="outline-none sm:w-full w-[150px]"
                placeholder="Search by name, ID"
              />
            </div>
            <div className="relative w-[185px]" ref={dropRef}>
              <div className="bg-white py-1 px-3 bg-opacity-40 rounded-[5px] absolute text-base backdrop-blur-[40px]">
                <button
                  className="flex justify-center items-center h-[30px] gap-2"
                  onClick={(e) => {
                    e.preventDefault()
                    setDropOpen((prev) => !prev)
                  }}
                >
                  Filter by status <FilterByIdIcon />
                </button>
                <div
                  className={`grid justify-normal items-center gap-3 overflow-hidden font-semibold ${
                    dropOpen ? 'h-full mt-2' : 'h-0'
                  }`}
                >
                  {filterByStatusData?.map((item, i) => (
                    <div
                      className="border-t pt-3 border-zinc-400 text-center"
                      key={i}
                    >
                      <button className=" hover:text-blue-600">
                        {item?.title}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-[1000px] lg:w-full w-screen bg-white rounded-[20.37px] px-7 py-8 sm:my-14 my-10 overflow-x-scroll">
        <table className="w-full">
          <tbody>
            <tr className="text-zinc-700 2xl:text-xl text-lg font-semibold tracking-tight text-left">
              <th>ID</th>
              <th>Projects Name</th>
              <th className="text-center">Total Hours</th>
              <th className="text-center">Spent Hours</th>
              <th className="text-center">Remaining Hours</th>
              <th className="text-center">Track</th>
            </tr>

            {projects?.map((item, i) => (
              <tr key={i}>
                <td className="lg:py-7 py-4">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 lg:w-full w-[90px]">
                    #{item?.orderId}
                  </div>
                </td>
                <td className="lg:py-7 py-4 2xl:w-[350px] w-[300px]">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 lg:w-full w-[270px]">
                    {item?.name}
                  </div>
                </td>
                <td className="lg:py-7 py-4 w-[157px]">
                  <div
                    className={`w-[117px] h-[34px] bg-opacity-20 rounded-[20px] flex justify-center items-center gap-2 bg-green-500 text-zinc-700 2xl:text-xl md:text-lg text-base font-bold tracking-tight mx-auto`}
                  >
                    {item?.totalHours}
                  </div>
                </td>
                <td className="lg:py-7 py-4 w-[157px]">
                  <div
                    className={`w-[117px] h-[34px] bg-opacity-20 rounded-[20px] flex justify-center items-center gap-2 bg-sky-500 text-zinc-700 2xl:text-xl md:text-lg text-base font-bold tracking-tight mx-auto`}
                  >
                    {item?.spentHours}
                  </div>
                </td>
                <td className="lg:py-7 py-4 w-[190px]">
                  <div
                    className={`w-[137px] h-[34px] bg-opacity-20 rounded-[20px] flex justify-center items-center gap-2 bg-rose-600 text-zinc-700 2xl:text-xl md:text-lg text-base font-bold tracking-tight mx-auto`}
                  >
                    {item?.totalHours}
                  </div>
                </td>

                <td className="lg:py-7 py-4 text-center w-[137px]">
                  <button
                    className="w-[100px] h-[34px] bg-blue-800 rounded-[10px] text-white text-center mx-auto"
                    onClick={() =>
                      router.push(`/dashboard/hourly-plan/${item?.orderId}`)
                    }
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MainHourlyPlan
