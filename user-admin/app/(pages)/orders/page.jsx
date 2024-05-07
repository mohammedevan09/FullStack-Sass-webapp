import MainAllOrders from './MainAllOrders'
import { getAllOrders } from '@/api/orderApi'

const page = async ({ searchParams }) => {
  const orders = await getAllOrders({ ...searchParams, role: 'admin' })

  return (
    <>
      <MainAllOrders
        projects={orders?.NormalServiceOrder || []}
        subscriptions={orders?.SubscriptionServiceOrder || []}
        hourlyData={orders?.HourlyServiceOrder || []}
      />
    </>
  )
}

export default page
