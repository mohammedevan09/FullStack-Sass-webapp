'use client'

import { FilterByIdIcon, SearchByIdIcon } from '@/staticData/Icon'
import StatusColor from '@/utils/StatusColor'
import { useEffect, useRef, useState } from 'react'

export const filterByStatusData = [
  {
    title: 'pending',
  },
  {
    title: 'running',
  },
  {
    title: 'done',
  },
]

const ProjectHeading = ({ title }) => {
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
    <div className="md:flex grid justify-between items-center sm:gap-[none] gap-5 ">
      <h2 className="text-2xl font-semibold">{title || 'All Projects'}</h2>
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
          <div
            className="relative w-[165px] bg-white rounded-[5px]"
            ref={dropRef}
          >
            <div className="py-1 px-3 bg-opacity-40 absolute text-base backdrop-blur-[40px] w-full bg-white rounded-[5px]">
              <button
                className="flex justify-center items-center h-[30px] gap-2 font-semibold"
                onClick={(e) => {
                  e.preventDefault()
                  setDropOpen((prev) => !prev)
                }}
              >
                Filter by status <FilterByIdIcon />
              </button>
              <div
                className={`grid justify-normal items-center overflow-hidden font-semibold w-full transition ${
                  dropOpen ? 'h-full mt-2' : 'h-0'
                } text-sm`}
              >
                {filterByStatusData?.map((item, i) => (
                  <div
                    className="border-t py-3 border-zinc-300 text-center"
                    key={i}
                  >
                    <button className=" hover:scale-105 transition">
                      <StatusColor status={item?.title} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectHeading
