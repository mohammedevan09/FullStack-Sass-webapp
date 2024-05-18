'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const ServiceTables = ({ serviceData, title, link }) => {
  const router = useRouter()
  return (
    <div className="lg:w-full w-screen px-7 overflow-x-scroll">
      {serviceData?.length === 0 ? (
        <h2 className="sm:text-xl text-lg py-6 text-gray-400 text-center font-semibold italic">
          {title} is empty!
        </h2>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-zinc-700 lg:text-xl text-lg font-semibold tracking-tight text-left">
              <th>ID</th>
              <th>Name</th>
              <th className="text-center">Icon</th>
              <th className="text-center">Is Active</th>
              <th className="text-center">Creator ID</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="lg:text-base text-sm font-medium text-zinc-800">
            {serviceData?.map((item, i) => (
              <tr key={i}>
                <td className="lg:py-5 py-4 w-[120px] pr-3">
                  <div className="w-[120px] truncate">#{item?._id}</div>
                </td>
                <td className="lg:py-5 py-4 pl-1">
                  <div className="truncate w-[200px]">{item?.name}</div>
                </td>
                <td className="lg:py-5 py-4 text-center px-2">
                  <div className="w-[40px] mx-auto">
                    <Image
                      src={item?.icon}
                      alt={item?.name}
                      width={300}
                      height={300}
                      className="h-auto"
                    />
                  </div>
                </td>
                <td className="lg:py-5 py-4 text-center px-3">
                  <div
                    className={`lg:w-[127px] w-[96px] h-[34px] mx-auto bg-opacity-20 rounded-[20px] flex justify-center items-center lg:gap-2 gap-[6px] ${
                      item?.isActive ? 'bg-blue-600' : 'bg-rose-600'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        item?.isActive ? 'bg-blue-600' : 'bg-rose-600'
                      }`}
                    />
                    {item?.isActive ? 'On' : 'Off'}
                  </div>
                </td>
                <td className="lg:py-5 py-4 px-2 text-center">
                  <div className="truncate px-2">#{item?.creatorId}</div>
                </td>
                <td className="lg:py-5 py-4 text-center">
                  <button
                    className="w-[120px] h-[34px] btn-hover rounded-[5px] text-center"
                    onClick={() => router.push(`/services${link}/${item?._id}`)}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ServiceTables
