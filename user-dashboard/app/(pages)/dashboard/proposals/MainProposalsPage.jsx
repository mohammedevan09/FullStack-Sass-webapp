'use client'

import GetACustomProposalModal from '@/components/modals/marketplaceModal/GetACustomProposalModal'
import {
  AddProjectIcon,
  FilterByIdIcon,
  SearchByIdIcon,
} from '@/staticData/Icon'
import { useRouter } from 'next/navigation'
import { filterByStatusData } from '@/staticData/MainData'
import { useEffect, useRef, useState } from 'react'
import ThanksSubModal from '@/components/modals/marketplaceModal/ThanksSubModal'

const MainProposalsPage = () => {
  const [openModalCustom, setOpenModalCustom] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)

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

  const router = useRouter()

  const proposals = [
    {
      id: '1030',
      name: 'wordpress theme customization',
    },
    {
      id: '1030',
      name: 'wordpress theme customization',
    },
    {
      id: '1030',
      name: 'wordpress theme customization',
    },
    {
      id: '1030',
      name: 'wordpress theme customization',
    },
    {
      id: '1030',
      name: 'wordpress theme customization',
    },
  ]
  return (
    <>
      <div className="sm:px-4 xs:px-3 px-1">
        <button
          onClick={() => setOpenModalCustom(true)}
          className="sm:mt-16 mt-10 sm:mb-14 mb-8 sm:py-3 py-2 sm:w-[285px] w-[240px] flex items-center justify-center sm:gap-2 gap-1 rounded-lg shadow border-2 border-blue-800 text-blue-800 lg:text-xl text-base font-medium"
        >
          <AddProjectIcon /> Request new proposals
        </button>
        <div className="sm:flex grid justify-between items-center sm:gap-[none] gap-5 ">
          <h2 className="text-2xl font-semibold">All Proposals</h2>
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
            <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
              <th>ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Action</th>
            </tr>

            {proposals?.map((item, i) => (
              <tr
                key={i}
                className="text-zinc-700 md:text-xl text-base font-normal"
              >
                <td className="lg:py-7 py-4">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-start items-center gap-3 md:w-full w-[80px]">
                    #{item?.id}
                  </div>
                </td>
                <td className="lg:py-7 py-4">
                  <div className="text-zinc-700 lg:text-xl text-[16px] font-normal flex justify-center items-center gap-3 lg:w-full w-[270px] mx-auto">
                    {item?.name}
                  </div>
                </td>
                <td className="py-7 text-center">
                  <button
                    className="md:w-44 w-36 h-[34px] bg-blue-800 rounded-[10px] text-white text-center mx-auto"
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(`/dashboard/proposals/${item?.id}`)
                    }}
                  >
                    Open Proposal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openModalCustom && (
        <GetACustomProposalModal
          openModal={openModalCustom}
          setOpenModal={setOpenModalCustom}
          openSubModal={openSubModal}
          setOpenSubModal={setOpenSubModal}
        />
      )}
      {openSubModal && (
        <ThanksSubModal
          setOpenModal={setOpenModalCustom}
          setOpenSubModal={setOpenSubModal}
        />
      )}
    </>
  )
}

export default MainProposalsPage
