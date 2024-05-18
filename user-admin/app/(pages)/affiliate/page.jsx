import { getAllAffiliates } from '@/api/affiliateApi'
import Link from 'next/link'
import React from 'react'
import ProjectHeading from '../orders/_components/ProjectHeading'
import TablePagination from '@/components/others/TablePagination'

const page = async ({ searchParams }) => {
  const { affiliates, totalDocsCount } = await getAllAffiliates(searchParams)

  return (
    <div className="my-10">
      <ProjectHeading title={'Affiliates List'} isHideStatus={true} />
      <div className="bg-white rounded-[20px] my-4 pt-8 pb-4 grid gap-4 overflow-x-hidden">
        <div className="lg:w-full w-screen px-7 overflow-x-scroll">
          {affiliates?.length === 0 ? (
            <h2 className="sm:text-xl text-lg py-6 text-gray-400 text-center font-semibold italic">
              Affiliates is empty!
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
                {affiliates?.map((item, i) => (
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
        <TablePagination pageCount={totalDocsCount} />
      </div>
    </div>
  )
}

export default page
