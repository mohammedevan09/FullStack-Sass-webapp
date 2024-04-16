import { getAllOrders } from '@/api/orderApi'
import { getServiceById } from '@/api/serviceApi'
import { getChatByOrderIdApi } from '@/api/orderChatApi'
import MainSubscriptionServiceById from './MainSubscriptionServiceById'

const page = async ({ params }) => {
  const order = await getAllOrders({}, `subscriptionService/${params?.id}`)
  const service = await getServiceById(
    `subscriptionService/${order?.serviceId}`
  )
  const orderChat = await getChatByOrderIdApi({ limit: 100 }, order?._id)

  return (
    <>
      <MainSubscriptionServiceById
        order={order}
        service={service?._id ? service : {}}
        orderChat={orderChat?.chat || {}}
        messageCount={orderChat?.messageCount}
      />
    </>
  )
}

export default page
