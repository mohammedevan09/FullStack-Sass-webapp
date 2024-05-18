import { makeCapitalize } from '@/utils/StatusColor'
import Image from 'next/image'

export const getColorClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending':
      return 'bg-rose-600'
    case 'done':
      return 'bg-green-500'
    case 'canceled':
      return ' bg-rose-600 text-red-600'
    default:
      return 'bg-blue-600'
  }
}

const OrderBasicInfo = ({ order, service }) => {
  return (
    <div className="overflow-hidden">
      <h1 className="md:text-2xl text-xl font-semibold">{order?.title}</h1>
      <div className="svg-shadow bg-white md:w-[400px] w-full rounded-lg mt-3 font-medium text-sm">
        <div className="py-6 px-5 grid relative overflow-hidden">
          <div className="flex gap-2 items-start">
            <div className="min-w-[50px]">
              <Image src={service?.icon} alt="icon" width={50} height={50} />
            </div>
            <div>
              <h1 className="font-bold text-lg">{service?.name}</h1>
              <h1 className="font-semibold text-sm">{service?.heading}</h1>
            </div>
          </div>
          <div className="grid gap-2 mt-6">
            <h6>
              <b>Order ID</b> - #{order?._id}
            </h6>
            {/* <h6>
            <b>Service ID</b> - #{service?._id}
          </h6> */}
            <h6>
              <b>Total Amount</b> - ${order?.totalAmount}
              {''}
              <span className="text-[11px] font-semibold italic">
                {order?.__t === 'SubscriptionServiceOrder' && '/MO'}
              </span>
            </h6>
            {/* <h6>
            <b>User ID</b> - #{order?.userId}
          </h6> */}
            <div className="w-full font-semibold text-sm">
              <div
                className={`w-[160px] h-[34px] mx-auto bg-opacity-20 absolute rotate-45 top-5 -right-10 flex justify-center items-center ${getColorClass(
                  order?.status
                )}`}
              >
                {makeCapitalize(order?.status)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderBasicInfo
