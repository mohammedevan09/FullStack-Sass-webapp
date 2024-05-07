import { getAllOrders } from '@/api/orderApi'
import BackButton from '@/components/others/BackButton'
import ProjectHeading from '../../_components/ProjectHeading'
import SubscriptionServiceTables from '@/components/tables/order/SubscriptionServiceTables'

const page = async ({ searchParams }) => {
  const { SubscriptionServiceOrder } = await getAllOrders({
    __t: 'SubscriptionServiceOrder',
    userId: searchParams?.userId,
    role: 'user',
    limit: 20,
  })
  return (
    <div className="sm:my-14 my-8">
      <BackButton title={'Go back'} link={`/dashboard/orders`} />
      <ProjectHeading title={'All Subscriptions'} />
      <div className="bg-white rounded-lg my-7 pt-7 overflow-hidden">
        <SubscriptionServiceTables
          subscriptions={SubscriptionServiceOrder || []}
        />
      </div>
    </div>
  )
}

export default page
