import StatusColor from '@/utils/StatusColor'
import Image from 'next/image'

const OrderBasicInfo = ({ order, service }) => {
  return (
    <div>
      <h1 className="md:text-2xl text-xl font-semibold">{order?.title}</h1>
      <div className="bg-white py-3 px-4 rounded-lg svg-shadow mt-3 font-medium sm:w-[400px] w-full text-sm grid gap-4">
        <Image
          src={service?.icon}
          alt="icon"
          width={60}
          height={60}
          className="mt-2"
        />
        <h6>
          <b>Order ID</b> - {order?._id}
        </h6>
        <h6>
          <b>Service ID</b> - {service?._id}
        </h6>
        <h6>
          <b>Total Amount</b> - ${order?.totalAmount}
        </h6>

        <div className="lg:w-[137px] w-[106px]  font-semibold text-sm">
          <StatusColor status={order?.status} />
        </div>
      </div>
    </div>
  )
}

export default OrderBasicInfo
