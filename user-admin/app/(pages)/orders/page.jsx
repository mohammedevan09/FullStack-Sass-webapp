import MainAllOrders from './MainAllOrders'
import { getAllOrders } from '@/api/orderApi'

const page = async () => {
  const orders = await getAllOrders()

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
