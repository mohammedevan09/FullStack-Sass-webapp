import { getAllOrders } from '@/api/orderApi'
import BackButton from '@/components/others/BackButton'
import ProjectHeading from '../../_components/ProjectHeading'
import HourlyServiceTables from '@/components/tables/HourlyServiceTables'

const page = async ({ searchParams }) => {
  const { HourlyServiceOrder } = await getAllOrders({
    __t: 'HourlyServiceOrder',
    limit: 20,
    ...(searchParams?.userId
      ? { userId: searchParams.userId }
      : { userId: 'none' }),
  })
  return (
    <div className="sm:my-14 my-8 sm:px-4 xs:px-3 px-1">
      <BackButton />
      <ProjectHeading title={'All Booked Hours'} />
      <div className="bg-white rounded-lg my-7 pt-7">
        <HourlyServiceTables hourlyData={HourlyServiceOrder || []} />
      </div>
    </div>
  )
}

export default page
