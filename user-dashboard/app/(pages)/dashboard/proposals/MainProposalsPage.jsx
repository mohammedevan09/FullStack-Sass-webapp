'use client'

import {
  AddProjectIcon,
  FilterByIdIcon,
  SearchByIdIcon,
} from '@/staticData/Icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const MainProposalsPage = () => {
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
      <Link
        href={'/dashboard/marketplace'}
        className="mt-16 mb-14 px-[14px] py-3 w-[285px] flex items-center justify-center gap-2 rounded-lg shadow border-2 border-blue-800 text-blue-800 text-xl font-medium"
      >
        <AddProjectIcon /> Request new proposals
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
    </>
  )
}

export default MainProposalsPage
