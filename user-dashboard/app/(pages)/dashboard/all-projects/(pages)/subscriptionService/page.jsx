import { getAllOrders } from '@/api/orderApi'
import BackButton from '@/components/others/BackButton'
import ProjectHeading from '../../_components/ProjectHeading'
import SubscriptionServiceTables from '@/components/tables/SubscriptionServiceTables'

const page = async ({ searchParams }) => {
  const { SubscriptionServiceOrder } = await getAllOrders({
    __t: 'SubscriptionServiceOrder',
    limit: 20,
    ...(searchParams?.userId
      ? { userId: searchParams.userId }
      : { userId: 'none' }),
  })
  return (
    <div className="sm:my-14 my-8 sm:px-4 xs:px-3 px-1">
      <BackButton />
      <ProjectHeading title={'All Subscriptions'} />
      <div className="bg-white rounded-lg my-7 pt-7">
        <SubscriptionServiceTables
          subscriptions={SubscriptionServiceOrder || []}
        />
      </div>
    </div>
  )
}

export default page
