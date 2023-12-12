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

const MainAllProjects = ({ projects }) => {
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
    <>
      <Link
        href={'/dashboard/marketplace/designAndDevelopmentPackages'}
        className="mt-16 mb-14 px-[14px] py-3 w-[190px] flex items-center justify-center gap-2 rounded-lg shadow border-2 border-blue-800 text-blue-800 text-xl font-medium"
      >
        <AddProjectIcon /> Add Projects
      </Link>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Projects</h2>
        <div className="flex gap-9">
          <div className="flex px-4 py-[7px] bg-white rounded-xl justify-start items-center gap-4">
            <SearchByIdIcon />
            <input
              type="text"
              className="outline-none"
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
      <div className="w-[1111px] bg-white rounded-[20.37px] px-7 py-8 my-14">
        <table className="w-full">
          <tbody>
            <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
              <th>ID</th>
              <th>Projects Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Progress</th>
              <th className="text-center">Track</th>
            </tr>

            {projects?.map((item, i) => (
              <tr key={i}>
                <td className="py-7">
                  <div className="text-zinc-700 text-xl font-normal flex justify-start items-center gap-3">
                    #{item?.orderId}
                  </div>
                </td>
                <td className="py-7 w-[400px]">
                  <div className="text-zinc-700 text-xl font-normal flex justify-start items-center gap-3">
                    {item?.name}
                  </div>
                </td>
                <td className="py-7 text-center">
                  <div
                    className={`w-[127px] h-[34px] mx-auto bg-opacity-20 rounded-[20px] flex justify-center items-center gap-2 ${
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
                <td className="py-7 text-center">{item?.progress}</td>
                <td className="py-7 text-center">
                  <button
                    className=" w-[100px] h-[34px] bg-blue-800 rounded-[10px] text-white text-center"
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
    </>
  )
}

export default MainAllProjects
