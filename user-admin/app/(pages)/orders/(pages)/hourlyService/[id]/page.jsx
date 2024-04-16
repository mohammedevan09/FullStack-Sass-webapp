import { getAllOrders } from '@/api/orderApi'
import MainHourlyServiceById from './MainHourlyServiceById'
import { getServiceById } from '@/api/serviceApi'
import { getChatByOrderIdApi } from '@/api/orderChatApi'

const page = async ({ params }) => {
  const order = await getAllOrders({}, `hourlyService/${params?.id}`)
  const service = await getServiceById(`hourlyService/${order?.serviceId}`)
  const orderChat = await getChatByOrderIdApi({ limit: 100 }, order?._id)

  return (
    <MainHourlyServiceById
      order={order}
      service={service?._id ? service : {}}
      orderChat={orderChat?.chat || {}}
      messageCount={orderChat?.messageCount}
    />
  )
}

export default page
