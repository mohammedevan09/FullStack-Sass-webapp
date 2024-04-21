'use client'

import { CloseMenuIcon } from '@/staticData/Icon'
import StatusColor, { makeCapitalize } from '@/utils/StatusColor'
import { formatDate } from '@/utils/formateDateAndTime'
import { useState } from 'react'

const AdditionInfo = ({ order }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`bg-white rounded-md svg-shadow px-6 transition relative`}>
      <div
        className="font-bold cursor-pointer flex items-center py-3 text-lg px-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        Additional Information
      </div>
      <div
        className={`${
          open ? 'rotate-[267deg]' : 'rotate-180 '
        } transition-all duration-300 ease-in-out absolute top-3 right-4`}
      >
        <CloseMenuIcon size={24} color={'blue'} />
      </div>
      <div
        className={`font-medium transition-all duration-500 ease-in-out grid overflow-hidden ${
          open ? 'max-h-[3000px] pb-2' : 'max-h-0'
        }`}
      >
        {Object.entries({
          Description: order?.description,
          'Project Status': (
            <div className="lg:w-[137px] w-[106px]">
              <StatusColor status={order?.status} />
            </div>
          ),
          'Payment Status': (
            <div className="lg:w-[137px] w-[106px]">
              <StatusColor status={order?.payment_status} />
            </div>
          ),
          'Payment Method': makeCapitalize(order?.payment_method_types),
          'Total Amount': `$${order?.totalAmount}`,
          ...order?.additionalInfo,
          'Service ID': `#${order?.serviceId}`,
          'User ID': `#${order?.userId}`,
          'Created At': formatDate(order?.createdAt),
          'Updated At': formatDate(order?.updatedAt),
        })?.map(([key, value], i) => {
          return (
            <div
              key={i}
              className="flex justify-between border-t border-[#00398329] "
            >
              <div className="w-1/2 px-2 border-r border-[#00398329] py-3 font-semibold">
                {key}
              </div>
              <div className="w-1/2 px-2 py-3 text-sm">
                {Array.isArray(value) ? value.join(' | ') : value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdditionInfo
