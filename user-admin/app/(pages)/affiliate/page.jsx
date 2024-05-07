import { getAllAffiliates } from '@/api/affiliateApi'
import { AllProjectsIcon } from '@/staticData/Icon'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const affiliatesData = await getAllAffiliates()
  return (
    <div className="mb-10">
      <h2 className="text-zinc-700 text-2xl flex justify-start items-center sm:gap-3 gap-2 mt-12">
        <AllProjectsIcon color={'black'} /> Affiliates List
      </h2>
      <div className="bg-white rounded-[20px] sm:my-8 my-6 pt-8 grid gap-4 overflow-x-hidden">
        <div className="lg:w-full w-screen px-7 overflow-x-scroll">
          {affiliatesData?.length === 0 ? (
            <h2 className="sm:text-xl text-lg py-6 text-gray-400 text-center font-semibold italic">
              {title} is empty!
            </h2>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-zinc-700 lg:text-base text-sm font-semibold tracking-tight text-left">
                  <th>User ID</th>
                  <th>Name</th>
                  <th className="text-center">Visitors count</th>
                  <th className="text-center">Sign Ups</th>
                  <th className="text-center">Paid Earnings</th>
                  <th className="text-center">Total Earnings</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody className="lg:text-base text-sm font-medium text-zinc-800">
                {affiliatesData?.map((item, i) => (
                  <tr key={i}>
                    <td className="lg:py-5 py-4 pr-1">
                      <div className="flex justify-start items-center gap-3 w-[90px]">
                        #{item?.userId?.slice(0, 8)}..
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 w-[200px] pl-1">
                      <div className="flex justify-start items-center gap-3 w-[200px]">
                        {item?.fullName?.length >= 60 ? (
                          <>{item?.fullName?.substring(0, 60)}...</>
                        ) : (
                          <>{item?.fullName}</>
                        )}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 px-2 text-center">
                      <div className="mx-auto min-w-[90px]">
                        #{item?.visitorsCount || 0}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 px-2 text-center">
                      <div className="mx-auto min-w-[90px]">
                        #{item?.signUps || 0}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 px-2 text-center">
                      <div className="mx-auto min-w-[90px]">
                        ${item?.paidEarnings || 0}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 px-2 text-center">
                      <div className="mx-auto min-w-[90px]">
                        ${item?.totalEarnings || 0}
                      </div>
                    </td>
                    <td className="lg:py-5 py-4 text-center">
                      <Link
                        href={`/affiliate/${item?.userId}`}
                        className="px-4 py-1 btn-hover rounded-[5px] text-center"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default page
