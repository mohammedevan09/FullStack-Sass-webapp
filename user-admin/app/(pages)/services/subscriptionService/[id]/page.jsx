import { getServiceById } from '@/api/serviceApi'
import MainSubscriptionService from './MainSubscriptionService'

const page = async ({ params }) => {
  const service = await getServiceById(`subscriptionService/${params?.id}`)

  return <MainSubscriptionService service={service} />
}

export default page
