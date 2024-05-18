'use client'

import {
  CrossSignIcon,
  FilterByIdIcon,
  SearchByIdIcon,
} from '@/staticData/Icon'
import { makeCapitalize } from '@/utils/StatusColor'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const filterByActive = [
  {
    label: 'On',
    value: true,
  },
  {
    label: 'Off',
    value: false,
  },
]

export const getActiveClass = (active) => {
  switch (active?.toLowerCase()) {
    case 'off':
      return 'bg-rose-600'
    case 'on':
      return 'bg-blue-500'
    default:
      return 'bg-rose-600'
  }
}

const ServiceFilter = ({ title }) => {
  const dropRef = useRef()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams)

  const [dropOpen, setDropOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState(
    (searchParams.get('isActive') == true && 'On') ||
      (searchParams.get('isActive') == false && 'Off') ||
      null
  )

  const handleSearch = useDebouncedCallback((search) => {
    if (search && search.startsWith('#')) {
      search = search.slice(1)
      params.set('search', search)
    } else if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 300)

  const handleFilterByActive = (item) => {
    setActiveFilter(item?.label || null)
    setDropOpen(false)
    if (item !== null) {
      params.set('isActive', item?.value?.toString())
    } else {
      params.delete('isActive')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

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
      <div className="flex sm:mb-0 mb-1 md:gap-9 gap-3 sm:">
        <div className="flex sm:px-4 px-1 py-[7px] bg-white rounded-xl justify-start items-center sm:gap-4 gap-1">
          <SearchByIdIcon />
          <input
            type="text"
            className="outline-none sm:w-full w-[150px] text-sm font-medium"
            placeholder="Search by name, ID"
            onChange={(e) => {
              handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get('search')?.toString()}
          />
        </div>
        <div className="flex">
          <div
            className="relative w-[175px] bg-white rounded-[5px]"
            ref={dropRef}
          >
            <div className="py-1 px-3 bg-opacity-40 absolute text-base backdrop-blur-[40px] w-full bg-white rounded-[5px] z-10">
              <button
                className="flex justify-center items-center h-[30px] gap-2 font-semibold mx-auto"
                onClick={(e) => {
                  e.preventDefault()
                  if (activeFilter === null) {
                    setDropOpen((prev) => !prev)
                  }
                }}
              >
                {activeFilter === null ? (
                  <>
                    Filter by Active <FilterByIdIcon />
                  </>
                ) : (
                  <div className={`flex justify-center items-center gap-2`}>
                    <div
                      className={`rounded-[20px] py-[2px] px-3 bg-opacity-20 text-sm ${getActiveClass(
                        activeFilter
                      )}`}
                    >
                      {makeCapitalize(activeFilter)}
                    </div>
                    <span
                      onClick={() => {
                        handleFilterByActive(null)
                      }}
                    >
                      <CrossSignIcon />
                    </span>
                  </div>
                )}
              </button>
              <div
                className={`grid justify-normal items-center overflow-hidden font-semibold w-full transition ${
                  dropOpen ? 'h-full mt-2' : 'h-0'
                } text-sm`}
              >
                {filterByActive?.map((item, i) => (
                  <div
                    className="border-t py-3 border-zinc-300 text-center"
                    key={i}
                    onClick={() => handleFilterByActive(item)}
                  >
                    <button className=" hover:scale-105 transition">
                      <div
                        className={`lg:w-[137px] w-[120px] h-[34px] mx-auto bg-opacity-20 rounded-[20px] flex justify-center items-center lg:gap-2 gap-[6px] ${getActiveClass(
                          item?.label
                        )}`}
                      >
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${getActiveClass(
                            item?.label
                          )}`}
                        />
                        {makeCapitalize(item?.label)}
                      </div>
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

export default ServiceFilter
