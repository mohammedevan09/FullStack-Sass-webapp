'use client'

import {
  AddProjectIcon,
  FilterByIdIcon,
  SearchByIdIcon,
} from '@/staticData/Icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const MainSubscriptionPage = ({ projects }) => {
  const router = useRouter()
  return (
    <>
      <Link
        href={'/dashboard/marketplace'}
        className="mt-16 mb-14 px-[14px] py-3 w-[190px] flex items-center justify-center gap-2 rounded-lg shadow border-2 border-blue-800 text-blue-800 text-xl font-medium"
      >
        <AddProjectIcon /> Add Plan
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
              <th>Projects Name</th>
              <th className="text-center">Last website Update</th>
              <th className="text-center">Subscription Renew</th>
              <th className="text-center">Track</th>
            </tr>

            {projects?.map((item, i) => (
              <tr key={i} className="text-xl text-zinc-700">
                <td className="py-7">#{item?.orderId}</td>
                <td className="py-7 w-[300px]">{item?.name}</td>
                <td className="py-7 text-center">{item?.lastWebsiteUpdate}</td>
                <td className="py-7 text-center">{item?.subscriptionRenew}</td>
                <td className="py-7 text-center">
                  <button
                    className=" w-[100px] h-[34px] bg-blue-800 rounded-[10px] text-white text-center mx-auto"
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
    </>
  )
}

export default MainSubscriptionPage
