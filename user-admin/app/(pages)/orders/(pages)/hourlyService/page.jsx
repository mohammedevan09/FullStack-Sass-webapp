import { getAllOrders } from '@/api/orderApi'
import BackButton from '@/components/others/BackButton'
import ProjectHeading from '../../_components/ProjectHeading'
import HourlyServiceTables from '@/components/tables/order/HourlyServiceTables'

const page = async ({ searchParams }) => {
  const { HourlyServiceOrder } = await getAllOrders({
    __t: 'HourlyServiceOrder',
    userId: searchParams?.userId,
    role: 'admin',
    limit: 20,
  })
  return (
    <div className="sm:my-14 my-8">
      <BackButton link={'/orders'} title={'Go back'} />
      <ProjectHeading title={'All Booked Hours'} />
      <div className="bg-white rounded-lg my-7 pt-7 overflow-hidden">
        <HourlyServiceTables hourlyData={HourlyServiceOrder || []} />
      </div>
    </div>
  )
}

export default page
