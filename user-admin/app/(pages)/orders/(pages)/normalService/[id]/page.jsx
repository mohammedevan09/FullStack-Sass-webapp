import { getAllOrders } from '@/api/orderApi'
import MainNormalServiceById from './MainNormalServiceById'

const page = async ({ params }) => {
  const order = await getAllOrders({}, `normalService/${params?.id}`)

  return <MainNormalServiceById order={order} />
}

export default page
