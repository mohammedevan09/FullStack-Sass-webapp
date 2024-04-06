import MainAllProjects from './MainAllProjects'
import { getAllOrders } from '@/api/orderApi'

const page = async ({ searchParams }) => {
  const orders = await getAllOrders(
    searchParams?.userId ? searchParams : { userId: 'none' }
  )

  return (
    <>
      <MainAllProjects
        projects={orders?.NormalServiceOrder || []}
        subscriptions={orders?.SubscriptionServiceOrder || []}
        hourlyData={orders?.HourlyServiceOrder || []}
      />
    </>
  )
}

export default page
