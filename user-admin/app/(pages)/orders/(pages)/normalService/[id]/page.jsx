import { getAllOrders } from '@/api/orderApi'
import MainNormalServiceById from './MainNormalServiceById'
import { getChatByIdApi } from '@/api/chatApi'

const page = async ({ params }) => {
  const order = await getAllOrders({}, `normalService/${params?.id}`)
  const orderChat = await getChatByIdApi('order', { limit: 100 }, order?._id)

  return (
    <MainNormalServiceById
      order={order || {}}
      service={order?.serviceId || {}}
      orderChat={orderChat?.chat || {}}
      messageCount={orderChat?.messageCount || 0}
    />
  )
}

export default page
