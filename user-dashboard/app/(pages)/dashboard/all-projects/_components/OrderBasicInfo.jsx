import StatusColor from '@/utils/StatusColor'
import Image from 'next/image'

const OrderBasicInfo = ({ order }) => {
  return (
    <div>
      <h1 className="md:text-2xl text-xl font-semibold">{order?.title}</h1>
      <div className="bg-white py-3 px-4 rounded-lg svg-shadow mt-3 font-medium sm:w-[400px] w-full">
        <Image
          src={order?.serviceId?.icon}
          alt="icon"
          width={60}
          height={60}
          className="mt-2"
        />
        <h6 className="text-base py-4">
          <b>Order ID</b> - {order?._id}
        </h6>
        <h6 className="text-base pb-4">
          <b>Service ID</b> - {order?.serviceId?._id}
        </h6>
        <h6 className="text-base pb-4">
          <b>Total Amount</b> - ${order?.totalAmount}
        </h6>
        <div className="w-10 font-semibold text-sm">
          <StatusColor status={order?.status} />
        </div>
      </div>
    </div>
  )
}

export default OrderBasicInfo
