import { getAllOrders } from '@/api/orderApi'
import BackButton from '@/components/others/BackButton'
import NormalServiceTables from '@/components/tables/NormalServiceTables'
import ProjectHeading from '../../_components/ProjectHeading'

const page = async ({ searchParams }) => {
  const { NormalServiceOrder } = await getAllOrders({
    __t: 'NormalServiceOrder',
    limit: 20,
    ...(searchParams?.userId
      ? { userId: searchParams.userId }
      : { userId: 'none' }),
  })
  return (
    <div className="sm:my-14 my-8 sm:px-4 xs:px-3 px-1">
      <BackButton />
      <ProjectHeading />
      <div className="bg-white rounded-lg my-7 pt-7">
        <NormalServiceTables projects={NormalServiceOrder || []} />
      </div>
    </div>
  )
}

export default page
