import { getAllService } from '@/api/serviceApi'
import BackButton from '@/components/others/BackButton'
import ServiceTables from '@/components/tables/ServiceTables'
import ServiceFilter from '../_components/ServiceFilter'
import TablePagination from '@/components/others/TablePagination'

const page = async ({ searchParams }) => {
  const {
    services: { SubscriptionService },
    totalDocsCount,
  } = await getAllService({
    __t: 'SubscriptionService',
    ...searchParams,
  })

  return (
    <div className="mb-10">
      <div className="sm:mt-14 mt-8 mb-8">
        <BackButton title={'Go Back'} link={'/services'} />
      </div>
      <ServiceFilter title={'Subscription Services'} />
      <div className="bg-white rounded-[20px] sm:my-8 my-6 pt-6 pb-4 grid gap-4 overflow-x-hidden">
        <ServiceTables
          serviceData={SubscriptionService || []}
          link={'/subscriptionService'}
          title={'Subscription Services'}
        />
        <TablePagination pageCount={totalDocsCount} />
      </div>
    </div>
  )
}

export default page
