import { getAllOrders } from '@/api/orderApi'
import MainNormalServiceById from './MainNormalServiceById'
import { getServiceById } from '@/api/serviceApi'
import { getChatByOrderIdApi } from '@/api/orderChatApi'

const page = async ({ params }) => {
  const order = await getAllOrders({}, `normalService/${params?.id}`)
  const service = await getServiceById(`normalService/${order?.serviceId}`)
  const orderChat = await getChatByOrderIdApi({ limit: 100 }, order?._id)

  return (
    <MainNormalServiceById
      order={order}
      service={service?._id ? service : {}}
      orderChat={orderChat?.chat || {}}
      messageCount={orderChat?.messageCount}
    />
  )
}

export default page
