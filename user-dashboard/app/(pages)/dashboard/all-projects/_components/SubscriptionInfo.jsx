import {
  LastUpdateIcon,
  NoteIcon,
  SubscriptionRenewIcon,
} from '@/staticData/Icon'
import { makeCapitalize } from '@/utils/StatusColor'
import { formatChatDateAndTime } from '@/utils/formateDateAndTime'

const SubscriptionInfo = ({ order }) => {
  const subInfo = [
    {
      title: 'Last Update',
      value: formatChatDateAndTime(order?.updatedAt),
      icon: <LastUpdateIcon size={'30'} />,
    },
    {
      title: 'Subscription Renew',
      value: order?.subscriptionRenew,
      icon: <SubscriptionRenewIcon size={'30'} />,
    },
    {
      title: 'Subscription Type',
      value: makeCapitalize(order?.subscriptionType),
      icon: <NoteIcon size={'36'} />,
    },
  ]

  return (
    <div className="md:flex grid md:justify-between items-center 2xl:gap-4 gap-2 mb-8">
      {subInfo?.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-4 w-full bg-white py-4 px-5 rounded-lg"
        >
          <div>{item?.icon}</div>
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
