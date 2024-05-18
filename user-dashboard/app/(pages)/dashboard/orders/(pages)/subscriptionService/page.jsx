import { getAllOrders } from '@/api/orderApi'
import BackButton from '@/components/others/BackButton'
import ProjectHeading from '../../_components/ProjectHeading'
import SubscriptionServiceTables from '@/components/tables/order/SubscriptionServiceTables'
import TablePagination from '@/components/others/TablePagination'

const page = async ({ searchParams }) => {
  const {
    orders: { SubscriptionServiceOrder },
    totalDocsCount,
  } = await getAllOrders({
    ...searchParams,
    __t: 'SubscriptionServiceOrder',
    userId: searchParams?.userId,
    role: 'user',
  })
  return (
    <div className="sm:my-14 my-8">
      <BackButton link={'/dashboard/orders'} title={'Go back'} />
      <ProjectHeading title={'All Subscriptions'} />
      <div className="bg-white rounded-[20px] sm:my-8 my-6 pt-6 pb-4 grid gap-4 overflow-x-hidden">
        <SubscriptionServiceTables
          subscriptions={SubscriptionServiceOrder || []}
        />
        <TablePagination pageCount={totalDocsCount} />
      </div>
    </div>
  )
}

export default page
