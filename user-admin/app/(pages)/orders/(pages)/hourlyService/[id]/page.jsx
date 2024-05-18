import { getAllOrders } from '@/api/orderApi'
import MainHourlyServiceById from './MainHourlyServiceById'
import { getChatByIdApi } from '@/api/chatApi'

const page = async ({ params, searchParams }) => {
  const order = await getAllOrders(
    {
      ...searchParams,
    },
    `hourlyService/${params?.id}`
  )
  const orderChat = await getChatByIdApi('order', { limit: 100 }, order?._id)

  return (
    <MainHourlyServiceById
      order={order || {}}
      service={order?.serviceId || {}}
      orderChat={orderChat?.chat || {}}
      messageCount={orderChat?.messageCount || 0}
    />
  )
}

export default page
