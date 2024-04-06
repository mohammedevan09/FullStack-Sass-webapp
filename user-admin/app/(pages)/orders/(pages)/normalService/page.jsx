import { getAllOrders } from '@/api/orderApi'
import BackButton from '@/components/others/BackButton'
import ProjectHeading from '../../_components/ProjectHeading'
import NormalServiceTables from '@/components/tables/order/NormalServiceTables'

const page = async ({ searchParams }) => {
  const { NormalServiceOrder } = await getAllOrders({
    __t: 'NormalServiceOrder',
    limit: 20,
  })
  return (
    <div className="sm:my-14 my-8">
      <BackButton link={'/orders'} title={'Go back'} />
      <ProjectHeading />
      <div className="bg-white rounded-lg my-7 pt-7 overflow-hidden">
        <NormalServiceTables projects={NormalServiceOrder || []} />
      </div>
    </div>
  )
}

export default page
