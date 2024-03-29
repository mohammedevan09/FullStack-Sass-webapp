'use server'

import { getServiceById } from '@/api/serviceApi'
import MainHourlyService from './MainHourlyService'

const page = async ({ params }) => {
  const service = await getServiceById(`hourlyService/${params?.id}`)

  return <MainHourlyService service={service} />
}

export default page
