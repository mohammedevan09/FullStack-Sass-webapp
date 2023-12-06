'use client'

import OpenTicketModal from '@/components/modals/ticketModals/OpenTicketModal'
import TicketSubmitThanksModal from '@/components/modals/ticketModals/TicketSubmitThanksModal'
import {
  AddProjectIcon,
  FilterByIdIcon,
  SearchByIdIcon,
} from '@/staticData/Icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const MainAllTicketsPage = ({ projects }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openSubModal, setOpenSubModal] = useState(false)

  const router = useRouter()
  return (
    <>
      <Link
        href={'/dashboard/marketplace'}
        className="mt-16 mb-14 px-[14px] py-3 w-[190px] flex items-center justify-center gap-2 rounded-lg shadow border-2 border-blue-800 text-blue-800 text-xl font-medium"
      >
        <AddProjectIcon /> Add Tickets
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
          <div className="w-[185px] h-[37px] bg-white bg-opacity-25 rounded-[5px] flex justify-center items-center gap-2">
            Filter by status <FilterByIdIcon />
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-[20.37px] px-7 py-8 my-14">
        <table className="w-full ">
          <tbody>
            <tr className="text-zinc-700 text-xl font-semibold tracking-tight text-left">
              <th>ID</th>
              <th>Name</th>
              <th className="text-center">Status</th>
              <th className="text-center">Track</th>
            </tr>

            {projects?.map((item, i) => (
              <tr key={i} className="text-zinc-700 text-xl font-normal">
                <td className="py-7">
                  <div className="">#{item?.orderId}</div>
                </td>
                <td className="py-7 w-[350px]">
                  <div className="">{item?.name}</div>
                </td>
                <td className="py-7">
                  <div
                    className={`w-[117px] h-[34px] bg-opacity-20 rounded-[20px] flex justify-center items-center gap-2 mx-auto ${
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
                <td className="py-7 text-center">
                  <button
                    className="w-[100px] h-[34px] bg-blue-800 rounded-[10px] text-white text-center mx-auto"
                    onClick={(e) => {
                      e.preventDefault()
                      router.push(
                        `/dashboard/all-tickets?ticket=${item?.orderId}`
                      )
                      setOpenModal(true)
                    }}
                  >
                    Open
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openModal && (
        <OpenTicketModal
          setOpenModal={setOpenModal}
          setOpenSubModal={setOpenSubModal}
        />
      )}
      {openSubModal && (
        <TicketSubmitThanksModal
          setOpenModal={setOpenModal}
          setOpenSubModal={setOpenSubModal}
        />
      )}
    </>
  )
}

export default MainAllTicketsPage
