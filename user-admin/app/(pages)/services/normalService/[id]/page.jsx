import { getServiceById } from '@/api/serviceApi'
import MainNormalService from './MainNormalService'

const page = async ({ params }) => {
  const service = await getServiceById(`normalService/${params?.id}`)

  return <MainNormalService service={service} />
}

export default page
