import { getAllOrders } from '@/api/orderApi'
import BackButton from '@/components/others/BackButton'
import ProjectHeading from '../../_components/ProjectHeading'
import HourlyServiceTables from '@/components/tables/order/HourlyServiceTables'
import TablePagination from '@/components/others/TablePagination'

const page = async ({ searchParams }) => {
  const {
    orders: { HourlyServiceOrder },
    totalDocsCount,
  } = await getAllOrders({
    ...searchParams,
    __t: 'HourlyServiceOrder',
    limit: 10,
    userId: searchParams?.userId,
    role: 'user',
  })
  return (
    <div className="sm:my-14 my-8">
      <BackButton link={'/dashboard/orders'} title={'Go back'} />
      <ProjectHeading title={'All Booked Hours'} />
      <div className="bg-white rounded-[20px] sm:my-8 my-6 pt-6 pb-4 grid gap-4 overflow-x-hidden">
        <HourlyServiceTables hourlyData={HourlyServiceOrder || []} />
        <TablePagination pageCount={totalDocsCount} />
      </div>
    </div>
  )
}

export default page
