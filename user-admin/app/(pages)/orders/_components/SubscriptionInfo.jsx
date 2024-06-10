'use client'

import {
  LastUpdateIcon,
  NoteIcon,
  SpentHoursIcon,
  SubscriptionRenewIcon,
  TotalHoursIcon,
} from '@/staticData/Icon'
import { makeCapitalize } from '@/utils/StatusColor'
import {
  formatChatDateAndTime,
  formatDateTwo,
} from '@/utils/formateDateAndTime'
import { useEffect, useState } from 'react'

const SubscriptionInfo = ({ order }) => {
  const [lastEvent, setLastEvent] = useState({
    eventType: 'None',
    eventDate: null,
  })

  const subInfo = [
    {
      title: 'Last Update',
      value: formatChatDateAndTime(order?.updatedAt),
      icon: <LastUpdateIcon size={'30'} />,
    },
    {
      title: 'Duration',
      value: `${order?.duration?.days || 0} Days`,
      icon: <SubscriptionRenewIcon size={'30'} />,
    },
    {
      title: 'Subscription Type',
      value: makeCapitalize(order?.subscriptionType),
      icon: <NoteIcon size={'36'} />,
    },
    {
      title: 'Current Start Time',
      value: formatDateTwo(order?.startTime),
      icon: <SpentHoursIcon size={'28'} />,
    },
    {
      title: 'Current End Time',
      value: formatDateTwo(order?.endTime),
      icon: <TotalHoursIcon size={'26'} />,
    },
    {
      title: 'Last Events',
      value: formatDateTwo(lastEvent?.eventDate),
      icon: <NoteIcon size={'36'} />,
      extra: makeCapitalize(lastEvent?.eventType),
    },
  ]

  useEffect(() => {
    if (order?.events && order.events.length > 0) {
      const latestEvent = order.events.reduce((latest, current) => {
        return new Date(current.eventDate) > new Date(latest.eventDate)
          ? current
          : latest
      })
      setLastEvent(latestEvent)
    }
  }, [order?.events])

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-between items-center 2xl:gap-8 gap-4 mb-8">
      {subInfo?.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 w-full bg-white py-4 px-5 rounded-lg relative svg-shadow"
        >
          {item?.extra && (
            <div className="absolute top-[18px] right-3 bg-blue-600 px-2 py-[3px] text-xs text-white font-medium rounded-full tracking-wider">
              {item?.extra}
            </div>
          )}
          <div className="w-[28px]">{item?.icon}</div>
          <div className="grid gap-1">
            <h3 className="text-[17px] font-bold">{item?.title}</h3>
            <h2 className="text-[13px] font-medium">{item?.value}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SubscriptionInfo
