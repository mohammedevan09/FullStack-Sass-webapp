'use client'

import {
  AddProjectIcon,
  FilterByIdIcon,
  SearchByIdIcon,
} from '@/staticData/Icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { filterByStatusData, filterByTypeData } from '@/staticData/MainData'
import { useEffect, useRef, useState } from 'react'

const MainAllProjects = ({ projects, subscriptions, hourlyData }) => {
  const router = useRouter()

  const [dropOpen, setDropOpen] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)

  const dropRef = useRef()
  const typeRef = useRef()

  useEffect(() => {
    const handleClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false)
      }
      if (typeRef.current && !typeRef.current.contains(e.target)) {
        setTypeOpen(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [dropRef, typeRef])

  return (
    <>
      <div className="sm:px-4 xs:px-3 px-1">
        <Link
          href={'/dashboard/services'}
          className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-1 sm:w-[180px] w-[150px] flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow border-2 border-blue-800 text-blue-800 lg:text-xl text-lg font-medium"
        >
          <AddProjectIcon /> Add Projects
        </Link>

        <div className="md:flex grid justify-between items-center sm:gap-[none] gap-5 ">
          <h2 className="text-2xl font-semibold">All Projects</h2>
          <div className="sm:flex grid sm:mb-0 mb-4 md:gap-9 gap-3 sm:">
            <div className="flex sm:px-4 px-1 py-[7px] bg-white rounded-xl justify-start items-center sm:gap-4 gap-1">
              <SearchByIdIcon />
              <input
                type="text"
                className="outline-none sm:w-full w-[150px]"
                placeholder="Search by name, ID"
              />
            </div>
            <div className="flex">
              <div className="relative w-[175px]" ref={dropRef}>
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
              <div className="relative w-[150px]" ref={typeRef}>
                <div className="bg-white py-1 px-3 bg-opacity-40 rounded-[5px] absolute text-base backdrop-blur-[40px]">
                  <button
                    className="flex justify-center items-center h-[30px] gap-2"
                    onClick={(e) => {
                      e.preventDefault()
                      setTypeOpen((prev) => !prev)
                    }}
                  >
                    Filter by Type <FilterByIdIcon />
                  </button>
                  <div
                    className={`grid justify-normal items-center gap-3 overflow-hidden font-semibold ${
                      typeOpen ? 'h-full mt-2' : 'h-0'
                    }`}
                  >
                    {filterByTypeData?.map((item, i) => (
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
      </div>

      <div className="bg-white rounded-[20px]">
        <div className="lg:w-full w-screen px-7 pt-8 sm:mt-14 mt-10 overflow-x-scroll sm:mb-4 mb-2">
          <caption className="sm:text-2xl text-xl font-semibold inline border-b-2 border-zinc-600 pb-2">
            Design and Developments
          </caption>
          <table className="w-full sm:mt-10 mt-8">
            <thead>
              <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
                <th>ID</th>
                <th>Projects Name</th>
                <th className="text-center">Status</th>
                <th className="text-center">Progress</th>
                <th className="text-center">Track</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((item, i) => (
                <tr key={i}>
                  <td className="lg:py-7 py-4">
                    <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 w-[90px]">
                      #{item?.orderId}
                    </div>
                  </td>
                  <td className="lg:py-7 py-4 2xl:w-[350px] w-[300px]">
                    <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 lg:w-full w-[270px]">
                      {item?.name}
                    </div>
                  </td>
                  <td className="lg:py-7 py-4 text-center">
                    <div
                      className={`lg:w-[127px] w-[96px] h-[34px] mx-auto bg-opacity-20 rounded-[20px] flex justify-center items-center lg:gap-2 gap-[6px] ${
                        item?.status?.toLocaleLowerCase() === 'pending'
                          ? 'bg-rose-600'
                          : item?.status?.toLocaleLowerCase() === 'done'
                          ? 'bg-green-500'
                          : 'bg-blue-600'
                      }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          item?.status?.toLocaleLowerCase() === 'pending'
                            ? 'bg-rose-600'
                            : item?.status?.toLocaleLowerCase() === 'done'
                            ? 'bg-green-500'
                            : 'bg-blue-600'
                        }`}
                      />
                      {item?.status}
                    </div>
                  </td>
                  <td className="lg:py-7 py-4 text-center">
                    <div className="lg:w-full w-[150px] mx-auto">
                      {item?.progress}
                    </div>
                  </td>
                  <td className="lg:py-7 py-4 text-center">
                    <button
                      className="w-[100px] h-[34px] btn-hover rounded-[10px] text-center"
                      onClick={() =>
                        router.push(`/dashboard/all-projects/${item?.orderId}`)
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
        <hr />
        <div className="lg:w-full w-screen px-7 sm:my-6 my-3 overflow-x-scroll">
          <caption className="sm:text-2xl text-xl font-semibold inline border-b-2 border-zinc-600 pb-1">
            Subscriptions
          </caption>
          <table className="w-full sm:mt-10 mt-8">
            <thead>
              <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
                <th>ID</th>
                <th>Projects Name</th>
                <th className="text-center">Last website Update</th>
                <th className="text-center">Subscription Renew</th>
                <th className="text-center">Track</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions?.map((item, i) => (
                <tr key={i} className="text-xl text-zinc-700">
                  <td className="lg:py-7 py-4">
                    <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 w-[90px]">
                      #{item?.orderId}
                    </div>
                  </td>
                  <td className="lg:py-7 py-4 2xl:w-[350px] w-[300px]">
                    <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 lg:w-[270px] w-[270px]">
                      {item?.name}
                    </div>
                  </td>
                  <td className="lg:py-7 py-4 text-center">
                    <div className="w-[180px] mx-auto">
                      {item?.lastWebsiteUpdate}
                    </div>
                  </td>
                  <td className="lg:py-7 py-4 text-center">
                    <div className="w-[180px] mx-auto">
                      {item?.subscriptionRenew}
                    </div>
                  </td>
                  <td className="lg:py-7 py-4 text-center">
                    <button
                      className="w-[100px] h-[34px] btn-hover rounded-[10px] text-center mx-auto"
                      onClick={() =>
                        router.push(`/dashboard/subscription/${item?.orderId}`)
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
        <hr />
        <div className="lg:w-full w-screen px-7 sm:my-6 my-3 overflow-x-scroll">
          <caption className="sm:text-2xl text-xl font-semibold inline border-b-2 border-zinc-600 pb-2">
            Hourly Plans
          </caption>
          <table className="w-full sm:mt-10 mt-8">
            <thead>
              <tr className="text-zinc-700 2xl:text-xl text-lg font-semibold tracking-tight text-left">
                <th>ID</th>
                <th>Projects Name</th>
                <th className="text-center">Total Hours</th>
                <th className="text-center">Spent Hours</th>
                <th className="text-center">Remaining Hours</th>
                <th className="text-center">Track</th>
              </tr>
            </thead>
            <tbody>
              {hourlyData?.map((item, i) => (
                <tr key={i}>
                  <td className="lg:py-7 py-4">
                    <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 w-[90px]">
                      #{item?.orderId}
                    </div>
                  </td>
                  <td className="lg:py-7 py-4 2xl:w-[350px] w-[300px]">
                    <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 lg:w-[300px] w-[270px]">
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
                      className="w-[100px] h-[34px] btn-hover rounded-[10px] text-center mx-auto"
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
      </div>
    </>
  )
}

export default MainAllProjects
