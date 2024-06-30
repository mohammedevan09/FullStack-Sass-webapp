'use client'

import { CloseMenuIcon } from '@/staticData/Icon'
import StatusColor, { makeCapitalize } from '@/utils/StatusColor'
import TrueFalseColumn from '@/utils/TrueFalseColumn'
import { formatDate } from '@/utils/formateDateAndTime'
import { useState } from 'react'

const MoreInfo = ({ data }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`bg-white rounded-md svg-shadow px-6 transition relative`}>
      <div
        className="font-bold cursor-pointer flex items-center py-3 text-lg px-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        More Information
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
          Description: data?.description,
          Timeline: `${data?.timeline} Days`,
          'Total Amount': `$${data?.totalAmount}`,
          'Payment Method': makeCapitalize(data?.payment_method_types),
          'Project Status': (
            <div className="lg:w-[137px] w-[106px]">
              <StatusColor status={data?.status} />
            </div>
          ),
          'Payment Status': (
            <div className="lg:w-[137px] w-[106px]">
              <StatusColor status={data?.payment_status} />
            </div>
          ),
          Meeting: (
            <div className="lg:w-[137px] w-[106px]">
              {TrueFalseColumn(data?.details?.isMeeting)}
            </div>
          ),
          Accepted: (
            <div className="lg:w-[137px] w-[106px]">
              {TrueFalseColumn(data?.details?.isAccepted)}
            </div>
          ),
          'Last Proposal By': data?.details?.lastProposalBy?.fullName,
          'Problem overview':
            data?.details?.executive_summary?.problem_overview,
          'Problem solution':
            data?.details?.executive_summary?.problem_overview,
          Features: data?.details?.scope_of_work?.features,
          'Resources Required':
            data?.details?.scope_of_work?.resources_required,
          'User ID': `#${data?.userId}`,
          'Customer ID': data?.payment_info?.customerId,
          'Payment Phone': data?.payment_info?.['Payment Phone'],
          'Created At': formatDate(data?.createdAt),
          'Updated At': formatDate(data?.updatedAt),
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

export default MoreInfo
