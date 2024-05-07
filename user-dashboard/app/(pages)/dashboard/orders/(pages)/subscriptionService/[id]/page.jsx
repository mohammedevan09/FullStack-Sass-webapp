import { getAllOrders } from '@/api/orderApi'
import MainSubscriptionServiceById from './MainSubscriptionServiceById'
import { getChatByIdApi } from '@/api/chatApi'

const page = async ({ params }) => {
  const order = await getAllOrders({}, `subscriptionService/${params?.id}`)
  const orderChat = await getChatByIdApi('order', { limit: 100 }, order?._id)

  return (
    <>
      <MainSubscriptionServiceById
        order={order || {}}
        service={order?.serviceId || {}}
        orderChat={orderChat?.chat || {}}
        messageCount={orderChat?.messageCount || 0}
      />
    </>
  )
}

export default page
