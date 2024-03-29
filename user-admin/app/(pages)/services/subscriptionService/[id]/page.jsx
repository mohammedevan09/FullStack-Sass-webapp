'use server'

import { getServiceById } from '@/api/serviceApi'
import { getAllForm } from '@/api/formApi'
import MainServicePage from '../../_components/servicePage/MainServicePage'

const page = async ({ params }) => {
  const service = await getServiceById(`subscriptionService/${params?.id}`)
  const forms = await getAllForm()

  return <MainServicePage service={service} forms={forms} />
}

export default page
