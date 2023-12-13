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

const MainProposalsPage = () => {
  const [openModalCustom, setOpenModalCustom] = useState(false)
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
      <button
        onClick={() => setOpenModalCustom(true)}
        className="mt-16 mb-14 px-[14px] py-3 w-[285px] flex items-center justify-center gap-2 rounded-lg shadow border-2 border-blue-800 text-blue-800 text-xl font-medium"
      >
        <AddProjectIcon /> Request new proposals
      </button>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Proposals</h2>
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
      <div className="2xl:w-[1111px] w-full 2xl:max-w-full max-w-[950px] bg-white rounded-[20.37px] px-7 py-8 my-14">
        <table className="w-full ">
          <tbody>
            <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
              <th>ID</th>
              <th className="text-center">Name</th>
              <th className="text-center">Action</th>
            </tr>

            {proposals?.map((item, i) => (
              <tr key={i} className="text-zinc-700 text-xl font-normal">
                <td className="py-7">
                  <div className="">#{item?.id}</div>
                </td>
                <td className="py-7 text-center">
                  <div className="mx-auto">{item?.name}</div>
                </td>
                <td className="py-7 text-center">
                  <button
                    className="w-44 h-[34px] bg-blue-800 rounded-[10px] text-white text-center mx-auto"
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
        />
      )}
    </>
  )
}

export default MainProposalsPage
